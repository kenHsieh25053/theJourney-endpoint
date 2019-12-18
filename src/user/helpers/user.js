import models from '../../models';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltrounds = 10;

module.exports = {
  _userSignup,
  _userLogin,
  _userLogout,
  _userDeleted
};

// user can sign up
async function _userSignup(email, username, password) {
  let hash = bcrypt.hashSync(password, saltrounds);

  // validate username
  const usernameValidation = await models.user.findOne({
    where: {
      username,
    }
  });

  if (usernameValidation) {
    return {
      status: 403,
      message: 'Please use other name!'
    };
  }

  // validate email
  const emailValidation = await models.user.findOne({
    where: {
      email,
    }
  });
  if (!emailValidation) {
    await models.user.create({
      email,
      password: hash
    });
    return {
      status: 200,
      message: 'User create successfully!'
    };
  } else {
    return {
      status: 403,
      message: 'Please use other email!'
    };
  }
}


// user can log in
async function _userLogin(args) {
  // validate email
  const emailValidation = await models.user.findOne({
    where: {
      email: args.email
    },
    attributes: ['id', 'email', 'password']
  });
  if (!emailValidation) {
    return {
      status: 403,
      message: 'Invaild email'
    };
  }

  // validate password
  let match = await bcrypt.compare(args.password, emailValidation.password);
  if (!match) {
    return {
      status: 403,
      message: 'Invaild password'
    };
  }

  const id_token = jwt.sign({
    id: emailValidation.id,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  }, process.env.JWT_SECRETKEY);
  return {
    status: 200,
    id_token: id_token
  };
}

// user can log out
async function _userLogout() {

}

// user can delete own account
async function _userDeleted(userId) {
  const user = await models.user.destroy({
    where: {
      id: userId
    }
  });

  if (user) {
    return 'User deleted!';
  } else {
    return 'Can\'t find user';
  }
}