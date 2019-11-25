import {
  postTravelList
} from "../helpers/travelList.js";

export default {
  Query: {

  },
  Mutation: {
    travelList: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const finalResult = await postTravelList(userId, args);
        return {
          status: 200,
          travelList: [{
            id: finalResult.id,
            name: finalResult.name,
            tags: finalResult.tags,
            stayFrom: finalResult.stayFrom,
            stayTo: finalResult.stayTo,
            days: finalResult.days,
            cost: finalResult.cost,
            rates: finalResult.rates,
            likes: finalResult.likes,
            createdAt: finalResult.createdAt,
            updatedAt: finalResult.updatedAt,
            transportation: finalResult.transportation,
            review: finalResult.review,
            userId: finalResult.userId
          }]
        };
      } catch (err) {
        return {
          status: 500,
          message: err.message
        };
      }
    }
  }
};