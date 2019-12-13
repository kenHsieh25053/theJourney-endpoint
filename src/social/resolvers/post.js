import {
  _getPosts,
  _addorUpdatePost,
  _deletePost
} from '../helpers/post.js';


export default {
  Query: {
    posts: async (_, args, {}) => {
      try {
        const result = await _getPosts(args);
        return {
          status: 200,
          posts: result.map(item => {
            return {
              id: item.id,
              text: item.text,
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
          message: err.message
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
        const result = await _addorUpdatePost(args, userId);
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
          message: err.message
        };
      }
    },

    postDelete: async (_, args, {}) => {
      try {
        const result = await _deletePost(args);
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