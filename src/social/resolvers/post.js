import {
  _posts,
  _postAddorUpdate,
  _postDelete
} from '../helpers/post.js';


export default {
  Query: {
    posts: async (_, args) => {
      try {
        const result = await _posts(args);
        return {
          status: 200,
          posts: result.map(item => {
            return {
              id: item.id,
              text: item.text,
              likes: item.likes,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              userId: item.userId,
              travelListId: item.travelListId
            };
          })
        };
      } catch (err) {
        return {
          status: 500,
          message: err
        };
      }
    }
  },

  Mutation: {
    postAddorUpdate: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _postAddorUpdate(args, userId);
        return {
          status: 200,
          post: {
            id: result.id,
            text: result.text,
            likes: result.likes,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            userId: result.userId,
            travelListId: result.travelListId
          }
        };
      } catch (err) {
        return {
          status: 500,
          message: err
        };
      }
    },

    postDelete: async (_, args) => {
      try {
        const result = await _postDelete(args);
        return {
          status: 200,
          message: result
        };
      } catch (err) {
        return {
          status: 500,
          message: err
        };
      }
    }
  }
};