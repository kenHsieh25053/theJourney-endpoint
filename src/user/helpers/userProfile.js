import models from "../../models";

module.exports = {
  postUserProfile,
  getUserProfile
};

async function postUserProfile(userId, args) {
  try {
    await models.user.update(args, {
      where: {
        id: userId
      }
    });

    const result = await models.user.findByPk(userId);
    return {
      status: 200,
      userProfile: [{
        username: result.username,
        email: result.email,
        position: result.position,
        countries: result.countries,
        cities: result.cities,
        headshot: result.headshot,
        profile: result.profile,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      }]
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message
    };
  }
}

async function getUserProfile(userId) {
  try {
    const result = await models.user.findByPk(userId);
    return {
      status: 200,
      userProfile: [{
        username: result.username,
        email: result.email,
        position: result.position,
        countries: result.countries,
        cities: result.cities,
        headshot: result.headshot,
        profile: result.profile,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
      }]
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message
    };
  }
}