import models from '../../models';
import uuidv4 from 'uuid/v4';

module.exports = {
  postTravelList
};

async function postTravelList(userId, args) {
  const id = uuidv4();
  let data = Object.assign({}, args, {
    userId
  });
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


// async function postTravelList(userId, args) {
//   try {
//     const result = await models.travelList.findByPk(args.id);

//     if (!result.id) {
//       const id = uuidv4();
//       let data = Object.assign({}, args, {
//         userId
//       });
//       data['id'] = id;
//       const finalResult = await models.travelList.create(data);
//       return {
//         status: 200,
//         travelList: [{
//           id: finalResult.id,
//           name: finalResult.name,
//           tags: finalResult.tags,
//           stayFrom: finalResult.stayFrom,
//           stayTo: finalResult.stayTo,
//           days: finalResult.days,
//           cost: finalResult.cost,
//           rates: finalResult.rates,
//           likes: finalResult.likes,
//           createdAt: finalResult.createdAt,
//           updatedAt: finalResult.updatedAt,
//           transportation: finalResult.transportation,
//           review: finalResult.review,
//           userId: finalResult.userId
//         }]
//       };
//     } else {
//       await models.travelList.update(args, {
//         where: {
//           id: args.id
//         }
//       });
//       const finalResult = await models.travelList.findByPk(args.id);
//       return {
//         status: 200,
//         travelList: [{
//           id: finalResult.id,
//           name: finalResult.name,
//           tags: finalResult.tags,
//           stayFrom: finalResult.stayFrom,
//           stayTo: finalResult.stayTo,
//           days: finalResult.days,
//           cost: finalResult.cost,
//           rates: finalResult.rates,
//           likes: finalResult.likes,
//           createdAt: finalResult.createdAt,
//           updatedAt: finalResult.updatedAt,
//           transportation: finalResult.transportation,
//           review: finalResult.review,
//           userId: finalResult.userId
//         }]
//       };
//     }
//   } catch (err) {
//     return {
//       status: 500,
//       message: err.message
//     };
//   }
// }