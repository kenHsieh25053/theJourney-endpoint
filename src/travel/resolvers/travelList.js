import {
  _getTravelList,
  _getAllTravelList,
  _postTravelList,
  _deleteTravelList
} from '../helpers/travelList.js';

export default {
  Query: {
    getTravelLists: async (_, {}, {
      user
    }) => {
      const userId = user.id;
      try {
        const result = await _getTravelList(userId);
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
    },

    getAllTravelLists: async () => {
      try {
        const result = await _getAllTravelList();
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
    postTravelList: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _postTravelList(userId, args);
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
    },

    deleteTravelList: async (_, args, {}) => {
      try {
        const result = await _deleteTravelList(args);
        return {
          status: 200,
          message: result
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