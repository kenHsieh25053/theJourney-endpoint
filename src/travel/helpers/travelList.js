import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  postTravelList,
  getTravelList
};

async function getTravelList(userId) {
  const result = await models.travelList.findAll({
    where: {
      userId: userId
    }
  });
  return result;
}

async function postTravelList(userId, args) {
  const id = uuidv4();
  let data = Object.assign({}, args, {
    userId
  });
  // Insert id for new travelList
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