import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  _postCity,
  _getCities,
  _deleteCity
};

async function _postCity(args) {
  // Insert id for new city row if id is null
  if (!args.id) {
    const id = uuidv4();
    args['id'] = id;
  }
  const result = await models.city.findOrCreate({
    where: {
      id: args.id
    },
    defaults: args
  });

  if (!result[1]) {
    await models.city.update(args, {
      where: {
        id: result[0].id
      }
    });
    const updatedResult = await models.city.findByPk(result[0].id);
    return updatedResult;
  } else {
    return result[0];
  }
}

async function _getCities(args) {
  const result = await models.city.findAll({
    where: {
      travelListId: args.travelListId
    },
    order: [
      ['createdAt', 'ASC']
    ]
  });
  return result;
}

async function _deleteCity(args) {
  const result = await models.city.destroy({
    where: {
      id: args.id
    }
  });

  if (result) {
    return 'City deleted!';
  } else {
    return 'Can\'t find the city';
  }
}