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
  const result = await models.user.findByPk(userId);
  return result;
}

async function _getUserProfile(userId) {
  const result = await models.user.findByPk(userId);
  return result;
}