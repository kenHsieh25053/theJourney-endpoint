import models from '../../models';

module.exports = {
  postUserProfile,
  getUserProfile
};

async function postUserProfile(userId, args) {
  await models.user.update(args, {
    where: {
      id: userId
    }
  });
  const result = await models.user.findByPk(userId);
  return result;
}

async function getUserProfile(userId) {
  const result = await models.user.findByPk(userId);
  return result;
}