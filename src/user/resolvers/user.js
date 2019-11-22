import { userSignup } from '../helpers/user.js';

export default {
  Query: {
    user: () => {
      return {
        email: 'kkw25053@gmail.com'
      };
    }
    // login : (_, { email, password }) => {
      
    // },

    // logout: (_, { id_token }) => {
      
    // },

    // userProfile: (_, { id_token }) => {
      
    // },
  },
  Mutation: {
    signup: async (_, { email, password }) => {
      try {
        const result = await userSignup(email, password);
        return {
          status: 200,
          message: result
        }
      } catch (e) {
        return {
          status: 500,
          message: e
        };
      }
    },

    // userProfile: (_, { id_token, username, password, email, profile }) => {
      
    // },
  }
};