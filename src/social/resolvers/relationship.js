import {
  _friendActions,
  _friendPendingList,
  _friendList,
  _likeLists,
  _updateLike,
  _notifications
} from '../helpers/relationship.js';

import models from '../../models';
import {
  withFilter,
  PubSub
} from 'apollo-server-express';
const pubsub = new PubSub();
const NOTIFICATIONS = 'NOTIFICATIONS';


export default {
  Query: {
    friendPendingList: async (_, __, {
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
          message: err
        };
      }
    },

    friendList: async (_, __, {
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
          message: err
        };
      }
    },

    notifications: async (_, __, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _notifications(userId);
        if (!result) {
          return {
            status: 200,
            userLists: null
          };
        }
        return {
          status: 200,
          notifications: result.map(item => {
            return {
              id: item.id,
              type: item.type,
              href: null,
              message: item.message,
              createdAt: item.createdAt
            };
          })
        };
      } catch (err) {
        return {
          status: 500,
          message: err
        };
      }
    },

    likeList: async (_, args) => {
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
          message: err
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

        // send notification depends on status
        switch (args.status) {
          case 'PENDING': {
            const userInfo = await models.user.findByPk(userId, {
              attributes: ['id', 'username', 'headshot']
            });
            userInfo.href = null;
            const message = `${userInfo.username} has sent an invitation to you!`;
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await pubsub.publish(NOTIFICATIONS, {
              friendNotifications: {
                message,
                userBid: args.user_b,
                createdAt,
                userInfo
              }
            });
            await models.notification.create({
              type: 'FIS', // friend invitation sent
              message,
              createdAt,
              userId: args.user_b
            });
            break;
          }

          case 'CONFIRMED': {
            const userInfo = await models.user.findByPk(userId, {
              attributes: ['id', 'username', 'headshot']
            });
            userInfo.href = null;
            const message = `${userInfo.username} and you are firend now!`;
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await pubsub.publish(NOTIFICATIONS, {
              friendNotifications: {
                message,
                userBid: args.user_b,
                createdAt,
                userInfo
              }
            });
            await models.notification.create({
              type: 'FIC', // friend invitation confirmed
              message,
              createdAt,
              userId: args.user_b
            });
            break;
          }

          case 'CANCELED': {
            await pubsub.publish(NOTIFICATIONS, {
              friendNotifications: {
                message: null,
                userBid: args.user_b,
                userInfo: {}
              }
            });
            await models.notification.create({
              type: 'FICA', // friend invitation canceled
              message: null,
              userId
            });
            break;
          }
        }

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
    },

    like: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _updateLike(args, userId);

        switch (args.type) {
          case 'POSTLIKE': {
            const userInfo = await models.user.findByPk(userId, {
              attributes: ['id', 'username', 'headshot']
            });
            userInfo.href = null;
            const message = `${userInfo.username} likes your post!`;
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await pubsub.publish(NOTIFICATIONS, {
              friendNotifications: {
                message,
                userBid: args.user_b,
                createdAt,
                userInfo
              }
            });
            await models.notification.create({
              type: 'LIKE', // someone likes your post
              message,
              createdAt,
              userId: args.user_b
            });
            break;
          }

          case 'TRVELLISTLIKE': {

          }

          case 'POSTCOMMENTLIKE': {

          }
        }

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
  },

  Subscription: {
    friendNotifications: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([NOTIFICATIONS]),
        (payload, variables) => {
          return payload.friendNotifications.userBid === variables.id;
        }
      )
    }
  }
};