import {
  _travelLists,
  _travelListsAll,
  _travelListPost,
  _travelListDelete
} from '../helpers/travelList.js';

export default {
  Query: {
    travelLists: async (_, __, {
      user
    }) => {
      const userId = user.id;
      try {
        const result = await _travelLists(userId);
        return {
          status: 200,
          travelLists: result.map(item => {
            return {
              id: item.id,
              name: item.name,
              tags: item.tags,
              type: item.type,
              stayFrom: item.stayFrom,
              stayTo: item.stayTo,
              days: item.days,
              costs: item.costs,
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

    travelListsAll: async () => {
      try {
        const result = await _travelListsAll();
        return {
          status: 200,
          travelLists: result.map(item => {
            return {
              id: item.id,
              name: item.name,
              tags: JSON.parse(item.tags),
              type: item.type,
              stayFrom: item.stayFrom,
              stayTo: item.stayTo,
              days: item.days,
              costs: item.costs,
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
          message: err
        };
      }
    }
  },

  Mutation: {
    travelListPost: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _travelListPost(userId, args);
        return {
          status: 200,
          travelList: {
            id: result.id,
            name: result.name,
            tags: JSON.parse(result.tags),
            type: result.type,
            stayFrom: result.stayFrom,
            stayTo: result.stayTo,
            days: result.days,
            costs: result.costs,
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
          message: err
        };
      }
    },

    travelListDelete: async (_, args) => {
      try {
        const result = await _travelListDelete(args);
        return {
          status: 200,
          message: result
        };
      } catch (err) {
        return {
          status: 500,
          message: err
        };
      }
    }
  }
};