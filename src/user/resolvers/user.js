import {
  _userSignup,
  _userLogin,
  _userDeleted
} from '../helpers/user.js';
import {
  _getUserProfile,
  _postUserProfile
} from '../helpers/userProfile.js';

export default {
  Query: {
    login: async (_, args) => {
      try {
        const result = await _userLogin(args);
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
        const result = await _getUserProfile(userId);
        return {
          status: 200,
          userProfile: {
            id: result.id,
            username: result.username,
            email: result.email,
            position: result.position,
            countries: result.countries,
            cities: result.cities,
            headshot: result.headshot,
            profile: result.profile,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
          }
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
      username,
      password
    }) => {
      try {
        const result = await _userSignup(email, username, password);
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

    userProfilePost: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _postUserProfile(userId, args);
        return {
          status: 200,
          userProfile: {
            username: result.username,
            email: result.email,
            position: result.position,
            countries: result.countries,
            cities: result.cities,
            headshot: result.headshot,
            profile: result.profile,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
          }
        };
      } catch (err) {
        return {
          status: 500,
          message: err.message
        };
      }
    },

    userDelete: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _userDeleted(userId);
        return {
          status: 200,
          message: result
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