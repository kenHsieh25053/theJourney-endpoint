import models from '../../models';
import uuidv4 from 'uuid/v4';
const {
  Sequelize
} = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  _travelLists,
  _travelListsAll,
  _travelListPost,
  _travelListDelete
};

// user can see the list of travelLists
async function _travelLists(args, userId) {
  // const cursorOption = cursor
  const travelLists = await models.travelList.findAll({
    where: {
      userId,
      [Op.and]: args.cursor ? {
        createdAt: {
          [Sequelize.Op.lt]: args.cursor,
        },
      } : null
    },
    order: [
      ['createdAt', 'DESC']
    ],
    limit: args.limit,
  });
  return travelLists;
}

// user can see all users' travelLists
async function _travelListsAll(args) {
  const allTravelLists = await models.travelList.findAll({
    where: args.cursor ? {
      createdAt: {
        [Sequelize.Op.lt]: args.cursor,
      },
    } : null,
    limit: args.limit,
    order: [
      ['updatedAt', 'DESC']
    ]
  });
  return allTravelLists;
}

async function _travelListPost(userId, args) {
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
    return travelList[0];
  }
}

// user can delete the travelList
async function _travelListDelete(args) {
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