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

async function _userSignup(email, password) {
  let hash = bcrypt.hashSync(password, saltrounds);

  // validate email
  const result = await models.user.findOne({
    where: {
      email,
    }
  });
  if (result === null) {
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

async function _userLogin(args) {
  // validate email
  const result = await models.user.findOne({
    where: {
      email: args.email
    },
    attributes: ['id', 'email', 'password']
  });
  if (!result) {
    return {
      status: 403,
      message: 'Invaild email'
    };
  }

  // validate password
  let match = await bcrypt.compare(args.password, result.password);
  if (!match) {
    return {
      status: 403,
      message: 'Invaild password'
    };
  }

  const id_token = jwt.sign({
    id: result.id,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  }, process.env.JWT_SECRETKEY);
  return {
    status: 200,
    id_token: id_token
  };
}

async function _userLogout() {

}

async function _userDeleted(userId) {
  const result = await models.user.destroy({
    where: {
      id: userId
    }
  });

  if (result) {
    return 'User deleted!';
  } else {
    return 'Can\'t find user';
  }
}