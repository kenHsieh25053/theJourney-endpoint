import models from '../../models';
import uuidv4 from 'uuid/v4';
const {
  Sequelize
} = require('sequelize');
const Op = Sequelize.Op;

import {
  _cityPost
} from './city';
import {
  _touristSpotPost
} from './touristSpot';

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

  // if user dosen't have any friend 
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
      attrubitions: ['id', 'name', 'photo_url', 'travelListId']
    });

    Object.assign(travelList, {
      cities
    });
  }
  return travelLists;
}

// user can create or update travellist
async function _travelListPost(args, userId) {
  const travelListId = uuidv4();
  // insert id to travelList
  args.id = travelListId
  // check cities exist, if it does insert cities into db
  if (args.cities.length !== 0) {
    let touristSpots = []
    // insert city id into every city obj
    args.cities.forEach(city => {
      city.id = uuidv4()
      city.travelListId = travelListId
      // check touristSpots exist, if it does insert an id
      if (city.touristSpots.length !== 0) {
        city.touristSpots.forEach(touristSpot => {
          touristSpot.id = uuidv4()
          touristSpot.cityId = city.id
        })
      }
      touristSpots.push(city.touristSpots)
    })
    const touristSpotList = touristSpots.flat()
    // insert travelList to db
    const travelList = await models.travelList.findOrCreate({
      where: {
        id: args.id
      },
      defaults: {
        id: args.id,
        name: args.name,
        types: args.types,
        stayFrom: args.stayFrom,
        stayTo: args.stayTo,
        review: args.review,
        countries: JSON.stringify(args.countries),
        permissions: args.permissions,
        userId
      }
    });

    if (!travelList[1]) {
      await models.travelList.update({
        name: args.name,
        types: args.types,
        stayFrom: args.stayFrom,
        stayTo: args.stayTo,
        review: args.review,
        countries: JSON.stringify(args.countries),
        permissions: args.permissions,
        userId
      }, {
        where: {
          id: travelList[0].id
        }
      });
    }
    await _cityPost(args.cities, userId)
    await _touristSpotPost(touristSpotList, userId)
  } else {
    // only insert travelList to db
    const travelList = await models.travelList.findOrCreate({
      where: {
        id: args.id
      },
      defaults: {
        id,
        name: args.name,
        types: args.types,
        stayFrom: args.stayFrom,
        stayTo: args.stayTo,
        review: args.review,
        countries: JSON.stringify(args.countries),
        permissions: args.permissions,
        userId
      }
    });

    if (!travelList[1]) {
      await models.travelList.update({
        name: args.name,
        types: args.types,
        stayFrom: args.stayFrom,
        stayTo: args.stayTo,
        review: args.review,
        countries: JSON.stringify(args.countries),
        permissions: args.permissions,
        userId
      }, {
        where: {
          id: travelList[0].id
        }
      });
    }
  }
  // need to fix it
  // return travellist post (cities, travelSpots)
  return args
}
