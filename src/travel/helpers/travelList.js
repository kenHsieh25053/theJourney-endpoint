import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  _getTravelLists,
  _getAllTravelLists,
  _postTravelList,
  _deleteTravelList
};

async function _getTravelLists(userId) {
  const travelLists = await models.travelList.findAll({
    where: {
      userId: userId
    },
    order: [
      ['createdAt', 'DESC']
    ]
  });
  return travelLists;
}

async function _getAllTravelLists() {
  const allTravelLists = await models.travelList.findAll({
    order: [
      ['updatedAt', 'DESC']
    ]
  });
  return allTravelLists;
}

async function _postTravelList(userId, args) {
  const id = uuidv4();
  // convert tags from string to json string
  args.tags = JSON.stringify(args.tags);
  // Insert id, userId for new travelList row
  let data = Object.assign({}, args, {
    id,
    userId
  });

  const travelList = await models.travelList.findOrCreate({
    where: {
      id: args.id
    },
    defaults: data
  });

  if (!travelList[1]) {
    await models.travelList.update(args, {
      where: {
        id: travelList[0].id
      }
    });
    const updatedResult = await models.travelList.findByPk(travelList[0].id);
    return updatedResult;
  } else {
    return travelList;
  }
}

async function _deleteTravelList(args) {
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