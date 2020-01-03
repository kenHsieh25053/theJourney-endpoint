import {
  _posts,
  _postAddorUpdate,
  _postDelete
} from '../helpers/post.js';

import models from '../../models';
import {
  withFilter,
  PubSub
} from 'apollo-server-express';
const pubsub = new PubSub();
const POSTNOTIFICATIONS = 'POSTNOTIFICATIONS';


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
              parentId: item.travelListId || item.postId
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
        const userInfo = await models.user.findByPk(userId, {
          attributes: ['id', 'username', 'headshot']
        });
        const authorId = await models.travelList.findByPk(args.travelListId, {
          attributes: ['userId']
        });
        const message = `${userInfo.username} has command your travellist!`;
        const type = 'CT'; // command the travellist

        await updateNotification(userInfo, authorId, type, message);

        return {
          status: 200,
          post: {
            id: result.id,
            text: result.text,
            likes: result.likes,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            userId: result.userId,
            parentId: result.travelListId || result.postId
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

        const authorId = await models.travelList.findByPk(args.travelListId, {
          attributes: ['userId']
        });

        await deletePostNotification(authorId);
        return {
          status: 200,
          message: result,
          post: {}
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
    postNotifications: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([POSTNOTIFICATIONS]),
        (payload, variables) => {
          return payload.postNotifications.userBid === variables.id;
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
    userId: authorId.userId
  });
  await pubsub.publish(POSTNOTIFICATIONS, {
    postNotifications: {
      message,
      userBid: authorId.userId,
      createdAt,
      userInfo
    }
  });
  console.log('end');
}

async function deletePostNotification(authorId) {
  await models.notification.destroy({
    where: {
      userId: authorId
    }
  });
  await pubsub.publish(POSTNOTIFICATIONS, {
    postNotifications: {
      message: null,
      userBid: authorId,
      userInfo: {}
    }
  });
}