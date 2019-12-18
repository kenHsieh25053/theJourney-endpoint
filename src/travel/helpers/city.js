import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  _postCity,
  _getCities,
  _deleteCity
};

// user can create or updating the city 
async function _postCity(args) {
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

// user can get the list of cities
async function _getCities(args) {
  const city = await models.city.findAll({
    where: {
      travelListId: args.travelListId
    },
    order: [
      ['createdAt', 'ASC']
    ]
  });
  return city;
}


// user can delete the city
async function _deleteCity(args) {
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