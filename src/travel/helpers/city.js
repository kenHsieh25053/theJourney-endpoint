import models from '../../models';
import uuidv4 from 'uuid/v4';
const {
  Sequelize
} = require('sequelize');
const Op = Sequelize.Op;

import {
  _touristSpotPost
} from './touristSpot';

module.exports = {
  _cities,
  _cityPost,
  _cityDelete,
};

// user can get the list of cities with touristspots
async function _cities(args) {
  const cities = await models.city.findAll({
    where: {
      travelListId: args.id,
      [Op.and]: args.cursor ? {
        createdAt: {
          [Sequelize.Op.lt]: args.cursor,
        },
      } : null,
    },
    order: [
      ['createdAt', 'ASC']
    ],
    limit: args.limit,
  });
  return getTouristSpots(cities, args);
}

// // user can create or updating the city
// async function _cityPost(args, userId) {
//   // Insert id for new city row if id is null
//   if (!args.id) {
//     const id = uuidv4();
//     args['id'] = id;
//   }
//   const city = await models.city.findOrCreate({
//     where: {
//       id: args.id,
//     },
//     defaults: args,
//   });

//   if (!city[1]) {
//     await models.city.update(args, {
//       where: {
//         id: city[0].id,
//       },
//     });
//     const updatedResult = await models.city.findByPk(city[0].id);
//     updateUserCityCounts(true, userId);
//     return updatedResult;
//   } else {
//     updateUserCityCounts(true, userId);
//     return city[0];
//   }
// }

// user can create or updating the city
async function _cityPost(cities, userId) {
  let idList = []
  cities.forEach(city => {
    idList.push(city.id)
    delete city.touristSpots
  })

  const idListDb = await models.city.findAll({
    where: {
      travelListId: cities[0].travelListId
    },
    attributes: ['id']
  })

  const isSame = idList.length - idListDb.length
  // check the consistency between db and new data 
  if (isSame >= 0) {
    // bulkcreate and bulkupdate exist data
    await models.city.bulkCreate(cities, {
      updateOnDuplicate: [
        'name',
        'stayFrom',
        'stayTo',
        'costs',
        'photo_url',
        'travelListId'
      ]
    })
    updateUserCityCounts(userId);
  } else {
    // delete exist data
    const deletedId = idListDb.filters(item => !idList.includes(item))
    const remainedId = idListDb.filters(item => idList.includes(item))

    await models.city.bulkDelete({
      where: {
        id: {
          [Op.in]: deletedId
        }
      }
    })
    // update existed city
    await models.city.bulkUpdate(cities, {
      where: {
        id: {
          [Op.in]: remainedId
        }
      }
    })
    updateUserCityCounts(userId);
  }

  // let user know how much money have spent on this trip
  const totalCost = await models.city.sum('costs', {
    where: {
      travelListId: cities[0].travelListId
    },
  });

  await models.travelList.update({
    costs: totalCost,
  }, {
    where: {
      id: cities[0].travelListId
    },
  });
}

// user can delete the city
async function _cityDelete(args) {
  const city = await models.city.destroy({
    where: {
      id: args.id,
    },
  });

  if (city) {
    updateUserCityCounts(false, userId);
    return 'City deleted!';
  } else {
    return "Can't find the city";
  }
}

// helper function
async function getTouristSpots(cities, args) {
  for (let city of cities) {
    const touristSpots = await models.touristSpot.findAll({
      where: {
        cityId: city.id,
        [Op.and]: args.cursor ? {
          createdAt: {
            [Op.lt]: args.cursor,
          },
        } : null,
      },
      limit: args.limit,
      order: [
        ['createdAt', 'ASC']
      ],
    });

    Object.assign(city, {
      touristSpots,
    });
  }
  return cities;
}

// helper function
async function updateUserCityCounts(userId) {
  // get user all travelList
  const travelListIds = await models.travelList.findAll({
    where: {
      userId
    },
    attributes: ['id']
  })
  // count user's cities' id
  const citiesCount = await models.city.count('id', {
    where: {
      [Op.in]: travelListIds
    }
  })

  await models.user.update({
    cities: citiesCount
  }, {
    where: {
      id: userId,
    },
  });
}
