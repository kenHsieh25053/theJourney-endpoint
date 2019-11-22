import models from '../../models/user.js';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  userSignup
};

async function userSignup (email, password) {
  let hash = bcrypt.hashSync(password, saltRounds);
  console.log(hash);
  console.log(email);
  try {
    const result = await models.User.findOne({
      where: {
        email: email
      }
    });
    console.log(result);
    if (result === null) {
      return 'Plase use other email!';
    } else {
      return await models.User.create({email: email, password: hash});
    }
  } catch (e) {
    return e;
  }


  // userLogin(id_token) {
      
  // }

  // userLogout(id_token) {

  // }
}