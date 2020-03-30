import models from '../../models';
import uuidv4 from 'uuid/v4';
import _ from 'lodash'
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

// user can create or update travellist
async function _travelListPost(args, userId) {
  if (args.id.length === 0 ) {
    args.id = uuidv4();
  }

  // get days
  let d1 = new Date(args.stayTo)
  let d2 = new Date(args.stayFrom)
  const days = (Math.abs(d1 - d2) / 86400000) + 1
  args.days = days
  
  let touristSpots = []
  // insert city id into every city obj
  args.cities.forEach(city => {
    if (city.id.length === 0) {
      city.id = uuidv4()
      city.travelListId = args.id
      // check touristSpots exist, if it does insert an id
      if (city.touristSpots.length !== 0) {
        city.touristSpots.forEach(touristSpot => {
          touristSpot.id = uuidv4()
          touristSpot.cityId = city.id
        })
      }
    }
    touristSpots.push(city.touristSpots)
  })
  const touristSpotList = touristSpots.flat()

  const argsCopy = _.cloneDeep(args)
  console.log(args)

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

  // count the number of countries 
  const count = args.countries.length
  // update user's countries
  updateCountries(true, count, userId)

  // insert timestamp to args
  Object.assign(args, {
    createdAt: travelList[0].createdAt,
    updatedAt: travelList[0].updatedAt
  })

  // if false, update travelList, city and touristspot
  if (!travelList[1]) {
    await models.travelList.update({
      name: args.name,
      types: args.types,
      stayFrom: args.stayFrom,
      stayTo: args.stayTo,
      review: args.review,
      countries: JSON.stringify(args.countries),
      permissions: args.permissions
    }, {
      where: {
        id: args.id
      }
    });
    await _cityPost(argsCopy, userId)
    await _touristSpotPost(touristSpotList, userId)
  } else {
    await _cityPost(argsCopy, userId)
    await _touristSpotPost(touristSpotList, userId)
  }
  return args
}

// user can delete the travelList
async function _travelListDelete(args, userId) {
  const travelList = await models.travelList.destroy({
    where: {
      id: args.id
    }
  });
  const count = args.countries.length
  // update the number of countries
  updateCountries(false, count, userId)
  if (travelList) {
    return {};
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

async function updateCountries(addOrMinus, count, userId) {
  let countries = await models.user.findOne({
    where: {
      id: userId
    },
    attributes: ['countries']
  })
  if(!addOrMinus) {
    countries - count
  } else {
    countries + count
  }
  await models.user.update(countries, {
    where: {
      id: userId
    }
  })
}
