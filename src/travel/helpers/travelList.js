import models from '../../models';
import uuidv4 from 'uuid/v4';
const {
  Sequelize
} = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  _travelLists,
  _travelListsAll,
  _travelListPost,
  _travelListDelete
};

// user can see all travelLists with cities
async function _travelListsAll(args, userId) {
  // get user's friends' id list 
  const friendList = await models.friend.findOne({
    where: {
      userId
    },
    attrubitions: ['friendList']
  });

  // if user doesn't have any friend 
  if (!friendList || friendList.friendList.length === 0) {
    const travelLists = await models.travelList.findAll({
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
            [Op.lt]: args.cursor,
          },
        } : null
      },
      order: [
        ['createdAt', 'DESC']
      ],
      limit: args.limit,
    });
    return getCities(travelLists, args);
  }

  const friendListArray = JSON.parse(friendList.friendList);
  const friendListIDs = [];
  friendListArray.forEach(user => {
    return friendListIDs.push(user.id);
  });

  // get the travelist depends on it's permissions 
  const travelLists = await models.travelList.findAll({
    where: {
      [Op.or]: [
        // public or onlyme or onlyfriends(in the friend's list)
        {
          permissions: 'PUBLIC'
        },
        {
          permissions: 'ONLYME',
          userId
        },
        {
          permissions: 'ONLYFRIENDS',
          userId: {
            [Op.in]: friendListIDs
          }
        }
      ],
      [Op.and]: args.cursor ? {
        createdAt: {
          [Op.lt]: args.cursor,
        },
      } : null
    },
    order: [
      ['createdAt', 'DESC']
    ],
    limit: args.limit,
  });

  return getCities(travelLists, args);
}


// user can see all users' travelLists with cities
async function _travelLists(args, userId) {
  const travelLists = await models.travelList.findAll({
    where: {
      userId,
      [Op.and]: args.cursor ? {
        createdAt: {
          [Op.lt]: args.cursor,
        },
      } : null
    },
    limit: args.limit,
    order: [
      ['updatedAt', 'DESC']
    ]
  });
  return getCities(travelLists, args);
}

async function _travelListPost(userId, args) {
  const id = uuidv4();
  // convert tags and countries from string to json string
  args.tags = JSON.stringify(args.tags);
  args.countries = JSON.stringify(args.countries);
  // Insert id, userId for new travelList row
  let data = Object.assign({}, args, {
    id,
    userId
  });
  const travelList = await models.travelList.findOrCreate({
    where: {
      id: args.id
    },
    defaults: data
  });
  if (!travelList[1]) {
    await models.travelList.update(args, {
      where: {
        id: travelList[0].id
      }
    });
    const updatedResult = await models.travelList.findByPk(travelList[0].id);
    return updatedResult;
  } else {
    return travelList[0];
  }
}

// user can delete the travelList
async function _travelListDelete(args) {
  const travelList = await models.travelList.destroy({
    where: {
      id: args.id
    }
  });

  if (travelList) {
    return 'TravelList deleted!';
  } else {
    return 'Can\'t find travelList';
  }
}


// helper function
async function getCities(travelLists, args) {
  for (let travelList of travelLists) {
    const cities = await models.city.findAll({
      where: {
        travelListId: travelList.id,
        [Op.and]: args.cursor ? {
          createdAt: {
            [Op.lt]: args.cursor,
          },
        } : null
      },
      limit: args.limit,
      order: [
        ['createdAt', 'ASC']
      ],
      attributions: ['id', 'name', 'photo_url', 'travelListId']
    });

    Object.assign(travelList, {
      cities
    });
  }
  return travelLists;
}