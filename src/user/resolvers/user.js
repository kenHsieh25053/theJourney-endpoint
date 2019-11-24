import {
  userSignup,
  userLogin
} from "../helpers/user.js";
import {
  getUserProfile,
  postUserProfile
} from "../helpers/userProfile.js";

export default {
  Query: {
    login: async (_, args) => {
      return await userLogin(args);
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
      const userId = user.id;
      return await getUserProfile(userId);
    }
  },
  Mutation: {
    signup: async (_, {
      email,
      password
    }) => {
      return await userSignup(email, password);
    },

    userProfile: async (_, args, {
      user
    }) => {
      const userId = user.id;

      return await postUserProfile(userId, args);
    }
  }
};