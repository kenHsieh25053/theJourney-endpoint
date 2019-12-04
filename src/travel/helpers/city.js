import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  postCity,
  getCities
};

async function postCity(args) {
  const id = uuidv4();
  // Insert id for new city row
  args['id'] = id;
  const result = await models.city.findOrCreate({
    where: {
      id
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

async function getCities(args) {
  const result = await models.city.findAll({
    where: {
      travelListId: args.travelListId
    }
  });
  return result;
}