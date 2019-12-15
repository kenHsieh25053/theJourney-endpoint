import {
  _friendPendingList,
  _friendList,
  _friendActions,
  _likeLists,
  _updateLike
} from '../helpers/relationship.js';


export default {
  Query: {
    friendPendingList: async (_, {}, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _friendPendingList(userId);
        if (!result) {
          return {
            status: 200,
            userLists: null
          };
        }
        return {
          status: 200,
          userLists: result.map(item => {
            return {
              id: item.id,
              username: item.username,
              headshot: item.headshot,
              href: null
            };
          })
        };
      } catch (err) {
        return {
          status: 500,
          message: err.message
        };
      }
    },

    friendList: async (_, {}, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _friendList(userId);
        if (!result) {
          return {
            status: 200,
            userLists: null
          };
        }
        return {
          status: 200,
          userLists: result.map(item => {
            return {
              id: item.id,
              username: item.username,
              headshot: item.headshot,
              href: null
            };
          })
        };
      } catch (err) {
        return {
          status: 500,
          message: err.message
        };
      }
    },

    likeList: async (_, args, {}) => {
      try {
        const result = await _likeLists(args);
        if (!result) {
          return {
            status: 200,
            userLists: null
          };
        }
        return {
          status: 200,
          userLists: result.map(item => {
            return {
              id: item.id,
              username: item.username,
              headshot: item.headshot,
              href: null
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
    friendActions: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _friendActions(args, userId);
        if (result.status === 404) {
          return {
            status: result.status,
            message: result.message
          };
        }
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
    },

    like: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _updateLike(args, userId);
        return {
          status: 200,
          likes: {
            id: result.id,
            liked: result.liked
          }
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