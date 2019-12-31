const {
  Sequelize
} = require('sequelize');
const Op = Sequelize.Op;
import models from './models';

export const authoriztion = async (userId, args) => {
  // get user's friends' id list 
  const friendList = await models.friend.findOne({
    where: {
      userId
    },
    attrubitions: ['friendList']
  });

  if (!friendList || friendList.length === 0) {
    const travelList = await models.travelList.findAll({
      where: {
        [Op.or]: [{
          permissions: 'PUBLIC'
        }, {
          permissions: 'ONLYME',
          [Op.and]: {
            userId
          }
        }],
        [Op.and]: args.cursor ? {
          createdAt: {
            [Sequelize.Op.lt]: args.cursor,
          },
        } : null
      },
      order: [
        ['createdAt', 'DESC']
      ],
      limit: args.limit,
    });
    return travelList;
  }

  const friendListArray = JSON.parse(friendList);
  const friendListID = [];
  friendListArray.forEach(user => {
    return friendListID.push(user.id);
  });

  // get the travelist depands on it's permitssions 
  const travelLists = await models.travelList.findAll({
    where: {
      [Op.or]: [
        // public or onlyme or onlyfriends(in the friend's list)
        {
          permissions: 'PUBLIC'
        },
        {
          permissions: 'ONLYME',
          [Op.and]: {
            userId
          }
        },
        {
          permissions: 'ONLYFRIENDS',
          [Op.and]: {
            userId: {
              [Op.in]: friendListArray
            }
          }
        }
      ],
      [Op.and]: args.cursor ? {
        createdAt: {
          [Sequelize.Op.lt]: args.cursor,
        },
      } : null
    },
    order: [
      ['createdAt', 'DESC']
    ],
    limit: args.limit,
  });
  return travelLists;
};