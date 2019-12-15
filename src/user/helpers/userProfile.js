import models from '../../models';

module.exports = {
  _postUserProfile,
  _getUserProfile
};

async function _postUserProfile(userId, args) {
  await models.user.update(args, {
    where: {
      id: userId
    }
  });
  const userProfile = await models.user.findByPk(userId);
  return userProfile;
}

async function _getUserProfile(userId) {
  const userProfile = await models.user.findByPk(userId);
  return userProfile;
}