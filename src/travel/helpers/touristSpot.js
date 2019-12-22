import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  _touristSpots,
  _touristSpotPost,
  _touristSpotDelete
};

// user can see the list of touristSpots
async function _touristSpots(args) {
  const touristSpot = await models.touristSpot.findAll({
    where: {
      cityId: args.cityId
    },
    order: [
      ['createdAt', 'ASC']
    ]
  });
  return touristSpot;
}

// user can create or updating the touristSpot
async function _touristSpotPost(args) {
  // Insert id for new touristSpot row if id is null
  if (!args.id) {
    const id = uuidv4();
    args['id'] = id;
  }
  const touristSpot = await models.touristSpot.findOrCreate({
    where: {
      id: args.id
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

  await models.city.update({
    rates: averageRate
  }, {
    where: {
      id: args.cityId
    }
  });

  if (!touristSpot[1]) {
    await models.touristSpot.update(args, {
      where: {
        id: touristSpot[0].id
      }
    });
    const updatedResult = await models.touristSpot.findByPk(touristSpot[0].id);
    return updatedResult;
  } else {
    return touristSpot[0];
  }
}

// user can delete the touristSpot
async function _touristSpotDelete(args) {
  const touristSpot = await models.touristSpot.destroy({
    where: {
      id: args.id
    }
  });

  if (touristSpot) {
    return 'TouristSpot deleted!';
  } else {
    return 'Can\'t find touristSpot';
  }
}