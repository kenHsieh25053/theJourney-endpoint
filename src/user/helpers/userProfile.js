import models from '../../models';

module.exports = {
  _userProfile,
  _userProfilePost
};


// user can see the user profile
async function _userProfile(userId) {
  const userProfile = await models.user.findByPk(userId);
  return userProfile;
}

// user can create or updating the user profile
async function _userProfilePost(userId, args) {
  await models.user.update(args, {
    where: {
      id: userId
    }
  });
  const userProfile = await models.user.findByPk(userId);
  return userProfile;
}