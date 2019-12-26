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

        const userInfo = await models.user.findByPk(userId, {
          attributes: ['id', 'username', 'headshot']
        });

        // send notification depends on status
        switch (args.status) {
          case 'PENDING': {
            const message = `${userInfo.username} has sent an invitation to you!`;
            const type = 'FIS'; // friend invitation sent
            await updateNotification(userInfo, args.user_b, type, message);
            break;
          }

          case 'CONFIRMED': {
            const message = `${userInfo.username} and you are firend now!`;
            const type = 'FIC'; // friend invitation confirmed
            await updateNotification(userInfo, args.user_b, type, message);
            break;
          }

          case 'CANCELED': {
            await models.notification.create({
              type: 'FICA', // friend invitation canceled
              message: null,
              userId
            });
            await pubsub.publish(NOTIFICATIONS, {
              friendNotifications: {
                message: null,
                userBid: args.user_b,
                userInfo: {}
              }
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

        const userInfo = await models.user.findByPk(userId, {
          attributes: ['id', 'username', 'headshot']
        });

        switch (args.type) {
          case 'POSTLIKE': {
            if (!result.liked) {
              await deleteLikeNotification(args.authorId);
            }
            const message = `${userInfo.username} likes your post!`;
            const type = 'LIKE';
            await updateNotification(userInfo, args.authorId, type, message);
            break;
          }

          case 'POSTCOMMENTLIKE': {
            if (!result.liked) {
              await deleteLikeNotification(args.authorId);
            }
            const message = `${userInfo.username} likes your postComment!`;
            const type = 'POSTCOMMENTLIKE';
            await updateNotification(userInfo, args.authorId, type, message);
            break;
          }

          case 'TRVELLISTLIKE': {
            if (!result.liked) {
              await deleteLikeNotification(args.authorId);
            }
            const message = `${userInfo.username} likes your travelList!`;
            const type = 'TRVELLISTLIKE';
            await updateNotification(userInfo, args.authorId, type, message);
            break;
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


// helper functions
async function updateNotification(userInfo, authorId, type, message) {
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  userInfo.href = null;
  await models.notification.create({
    type,
    message,
    createdAt,
    userId: authorId
  });
  await pubsub.publish(NOTIFICATIONS, {
    friendNotifications: {
      message,
      userBid: authorId,
      createdAt,
      userInfo
    }
  });
}

async function deleteLikeNotification(authorId) {
  await models.notification.destroy({
    where: {
      userId: authorId
    }
  });
  await pubsub.publish(NOTIFICATIONS, {
    friendNotifications: {
      message: null,
      userBid: authorId,
      userInfo: {}
    }
  });
}