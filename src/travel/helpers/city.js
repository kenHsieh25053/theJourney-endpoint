import models from '../../models';
import uuidv4 from 'uuid/v4';
const {
  Sequelize
} = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  _cities,
  _cityPost,
  _cityDelete
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
      } : null
    },
    order: [
      ['createdAt', 'ASC']
    ],
    limit: args.limit,
  });
  return getTouristSpots(cities, args);
}

// user can create or updating the city 
async function _cityPost(args) {
  // Insert id for new city row if id is null
  if (!args.id) {
    const id = uuidv4();
    args['id'] = id;
  }
  const city = await models.city.findOrCreate({
    where: {
      id: args.id
    },
    defaults: args
  });

  if (!city[1]) {
    await models.city.update(args, {
      where: {
        id: city[0].id
      }
    });
    const updatedResult = await models.city.findByPk(city[0].id);
    return updatedResult;
  } else {
    return city[0];
  }
}

// user can delete the city
async function _cityDelete(args) {
  const city = await models.city.destroy({
    where: {
      id: args.id
    }
  });

  if (city) {
    return 'City deleted!';
  } else {
    return 'Can\'t find the city';
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
            [Sequelize.Op.lt]: args.cursor,
          },
        } : null
      },
      limit: args.limit,
      order: [
        ['createdAt', 'ASC']
      ]
    });

    Object.assign(city, {
      touristSpots
    });
  }
  return cities;
}