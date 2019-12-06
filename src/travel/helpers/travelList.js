import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  _getTravelList,
  _getAllTravelList,
  _postTravelList,
  _deleteTravelList
};

async function _getTravelList(userId) {
  const result = await models.travelList.findAll({
    where: {
      userId: userId
    }
  });
  return result;
}

async function _getAllTravelList() {
  const result = await models.travelList.findAll({
    order: [['updatedAt', 'DESC']]
  });
  return result;
}

async function _postTravelList(userId, args) {
  const id = uuidv4();
  let data = Object.assign({}, args, {
    userId
  });
  // Insert id for new travelList row
  data['id'] = id;
  const result = await models.travelList.findOrCreate({
    where: {
      id: args.id
    },
    defaults: data
  });

  if (!result[1]) {
    await models.travelList.update(args, {
      where: {
        id: result[0].id
      }
    });
    const updatedResult = await models.travelList.findByPk(result[0].id);
    return updatedResult;
  } else {
    return result[0];
  }
}

async function _deleteTravelList(args) {
  const result = await models.travelList.destroy({
    where: {
      id: args.id
    }
  });

  if (result) {
    return 'TravelList deleted!';
  } else {
    return 'Can\'t find travelList';
  }
}