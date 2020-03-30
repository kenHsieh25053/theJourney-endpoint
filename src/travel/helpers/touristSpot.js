import models from '../../models';
import uuidv4 from 'uuid/v4';
const {
  Sequelize
} = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  _touristSpots,
  _touristSpotPost,
  _touristSpotDelete,
};

// user can see the list of touristSpots
async function _touristSpots(args) {
  const touristSpot = await models.touristSpot.findAll({
    where: {
      cityId: args.cityId,
      [Op.and]: args.cursor ? {
        createdAt: {
          [Sequelize.Op.lt]: args.cursor,
        },
      } : null,
    },
    order: [
      ['createdAt', 'ASC']
    ],
    limit: args.limit,
  });
  return touristSpot;
}

// user can create or updating the touristSpot
// async function _touristSpotPost(args, userId) {
//   // Insert id for new touristSpot row if id is null
//   if (!args.id) {
//     const id = uuidv4();
//     args['id'] = id;
//   }
//   const touristSpot = await models.touristSpot.findOrCreate({
//     where: {
//       id: args.id,
//     },
//     defaults: args,
//   });

// // sum all touristSpot' cost
// const totalCost = await models.touristSpot.sum('cost', {
//   where: {
//     cityId: args.cityId,
//   },
// });

// await models.city.update(
//   {
//     cost: totalCost,
//   },
//   {
//     where: {
//       id: args.cityId,
//     },
//   }
// );

//   // sum all touristSpot' rates then get the average rates
//   const totalRate = await models.touristSpot.sum('rates', {
//     where: {
//       cityId: args.cityId,
//     },
//   });

//   const countOfCity = await models.touristSpot.count('id', {
//     where: {
//       cityId: args.cityId,
//     },
//   });

//   let averageRate = new Number(totalRate / countOfCity).toFixed(1);

//   await models.city.update(
//     {
//       rates: averageRate,
//     },
//     {
//       where: {
//         id: args.cityId,
//       },
//     }
//   );

//   if (!touristSpot[1]) {
//     await models.touristSpot.update(args, {
//       where: {
//         id: touristSpot[0].id,
//       },
//     });
//     const updatedResult = await models.touristSpot.findByPk(touristSpot[0].id);
//     updateTouristSpotsCounts(true, userId);
//     return updatedResult;
//   } else {
//     updateTouristSpotsCounts(true, userId);
//     return touristSpot[0];
//   }
// }

async function _touristSpotPost(touristSpots, userId) {
  let touristSpotIdListID = []
  let cityListId = []
  touristSpots.forEach(touristSpot => {
    touristSpotIdListID.push(touristSpot.id)
    cityListId.push(touristSpot.cityId)
  })
  
  const touristSpotIdListIdDb = await models.touristSpot.findAll({
    where: {
      cityId: {
        [Op.in]: cityListId
      }
    },
    attributes: ['id']
  })

  let idDb = []
  touristSpotIdListIdDb.forEach(id => {
    idDb.push(id.id)
  })

  const isSame = touristSpotIdListID.length - touristSpotIdListIdDb.length
  console.log(isSame)
  // check the consistency bewteen db and new data 
  if (isSame >= 0) {
    // bulkcreate and bulkupdate exist data
    await models.touristSpot.bulkCreate(touristSpots, {
      updateOnDuplicate: [
        'name',
        'rates',
        'photo_url',
        'cityId'
      ]
    })
    await updateTouristSpotsCounts(userId);
  } else {
    // delete exist data
    const deletedId = idDb.filter(item => !touristSpotIdListID.includes(item))
    await models.touristSpot.destroy({
      where: {
        id: {
          [Op.in]: deletedId
        }
      }
    })
    // update existed touristspot
    await models.touristSpot.bulkCreate(touristSpots, {
      updateOnDuplicate: [
        'name',
        'rates',
        'photo_url',
        'cityId'
      ]
    })
    await updateTouristSpotsCounts(userId);
  }

  // // sum all touristSpot' rates then get the average rates
  // const totalRate = await models.touristSpot.sum('rates', {
  //   where: {
  //     cityId: touristSpots[0].cityId,
  //   },
  // });
  // let averageRate = new Number(totalRate / countOfCity).toFixed(1);

  // await models.city.update(
  //   {
  //     rates: averageRate,
  //   },
  //   {
  //     where: {
  //       id: args.cityId,
  //     },
  //   }
  // );
}

// user can delete the touristSpot
async function _touristSpotDelete(args) {
  const touristSpot = await models.touristSpot.destroy({
    where: {
      id: args.id,
    },
  });

  if (touristSpot) {
    updateTouristSpotsCounts(false, userId);
    return 'TouristSpot deleted!';
  } else {
    return "Can't find touristSpot";
  }
}

// helper function
// async function updateTouristSpotsCounts(addOrDelete, userId) {
//   let touristSpots = await models.user.findOne({
//     where: {
//       id: userId,
//     },
//     attrubitions: ['touristSpots'],
//   });
//   if (!addOrDelete) {
//     await models.user.update(
//       { touristSpots: touristSpots - 1 },
//       {
//         where: {
//           id: userId,
//         },
//       }
//     );
//   } else {
//     await models.user.update(
//       { touristSpots: touristSpots + 1 },
//       {
//         where: {
//           id: userId,
//         },
//       }
//     );
//   }
// }

async function updateTouristSpotsCounts(userId) {
  // get user all travelList
  const travelListIds = await models.travelList.findAll({
    where: {
      userId
    },
    attributes: ['id']
  })
  let travelListIdArray = []
  travelListIds.forEach(travelListId => {
    travelListIdArray.push(travelListId.id)
  })
  // get all cities' id
  const cityIds = await models.city.findAll({
    where: {
      travelListId: {
        [Op.in]: travelListIdArray
      }
    },
    attributes: ['id']
  })
  let cityIdArray = []
  cityIds.forEach(cityId => {
    cityIdArray.push(cityId.id)
  })
  // count all touristSpots' id
  const touristSpotCount = await models.touristSpot.count('id', {
    where: {
      cityId: {
        [Op.in]: cityIds
      }
    }
  })

  await models.user.update({
    touristSpots: touristSpotCount
  }, {
    where: {
      id: userId,
    },
  });
}
