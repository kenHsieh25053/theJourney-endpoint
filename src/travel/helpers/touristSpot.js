import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  _postTouristSpot,
  _getTouristSpot,
  _deleteTouristSpot
};

async function _postTouristSpot(args) {
  const id = uuidv4();
  // Insert id for new touristSpot row
  args['id'] = id;
  const result = await models.touristSpot.findOrCreate({
    where: {
      id
    },
    defaults: args
  });

  // sum all touristSpot' cost
  const totalCost = await models.touristSpot
    .sum('cost', {
      where: {
        cityId: args.cityId
      }
    });

  await models.city.update({
    cost: totalCost
  }, {
    where: {
      id: args.cityId
    }
  });

  // sum all touristSpot' rates then get the average rates
  const totalRate = await models.touristSpot.sum('rates', {
    where: {
      cityId: args.cityId
    }
  });

  const countOfCity = await models.touristSpot.count('id', {
    where: {
      cityId: args.cityId
    }
  });

  let averageRate = new Number(totalRate / countOfCity).toFixed(1);
  // change all tables' rate column from int to float

  await models.city.update({
    rates: averageRate
  }, {
    where: {
      id: args.cityId
    }
  });

  if (!result[1]) {
    await models.touristSpot.update(args, {
      where: {
        id: result[0].id
      }
    });
    const updatedResult = await models.touristSpot.findByPk(result[0].id);
    return updatedResult;
  } else {
    return result[0];
  }
}

async function _getTouristSpot(args) {
  const result = await models.touristSpot.findAll({
    where: {
      cityId: args.cityId
    }
  });
  return result;
}

async function _deleteTouristSpot(args) {
  const result = await models.touristSpot.destroy({
    where: {
      id: args.id
    }
  });

  if (result) {
    return 'TouristSpot deleted!';
  } else {
    return 'Can\'t find touristSpot';
  }
}