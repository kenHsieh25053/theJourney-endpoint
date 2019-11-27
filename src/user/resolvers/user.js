import {
  userSignup,
  userLogin
} from '../helpers/user.js';
import {
  getUserProfile,
  postUserProfile
} from '../helpers/userProfile.js';

export default {
  Query: {
    login: async (_, args) => {
      try {
        const result = await userLogin(args);
        return {
          status: result.status,
          id_token: result.id_token,
          message: result.message
        };
      } catch (err) {
        return {
          status: 500,
          message: err.message
        };
      }
    },

    // logout: (_, {}, { user }) => {
    //   return {
    //     status: 200,
    //     message: 'User logout',
    //     id_token: ''
    //   };
    // },

    userProfile: async (_, {}, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await getUserProfile(userId);
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
  },

  Mutation: {
    signup: async (_, {
      email,
      password
    }) => {
      try {
        const result = await userSignup(email, password);
        return {
          status: result.status,
          message: result.message
        };
      } catch (err) {
        return {
          status: 500,
          message: err.message
        };
      }
    },

    userProfile: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await postUserProfile(userId, args);
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
  }
};