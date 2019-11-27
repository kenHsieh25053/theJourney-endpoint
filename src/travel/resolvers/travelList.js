import {
  postTravelList,
  getTravelList
} from '../helpers/travelList.js';

export default {
  Query: {
    travelList: async (_, {}, {
      user
    }) => {
      const userId = user.id;
      try {
        const result = await getTravelList(userId);
        return {
          status: 200,
          travelList: result.map(item => {
            return {
              id: item.id,
              name: item.name,
              tags: item.tags,
              stayFrom: item.stayFrom,
              stayTo: item.stayTo,
              days: item.days,
              cost: item.cost,
              rates: item.rates,
              likes: item.likes,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              transportation: item.transportation,
              review: item.review,
              userId: item.userId
            };
          })
        };
      } catch (err) {
        return {
          status: 500,
          message: err.message
        };
      }
    }
  },

  Mutation: {
    travelList: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await postTravelList(userId, args);
        return {
          status: 200,
          travelList: {
            id: result.id,
            name: result.name,
            tags: result.tags,
            stayFrom: result.stayFrom,
            stayTo: result.stayTo,
            days: result.days,
            cost: result.cost,
            rates: result.rates,
            likes: result.likes,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            transportation: result.transportation,
            review: result.review,
            userId: result.userId
          }
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