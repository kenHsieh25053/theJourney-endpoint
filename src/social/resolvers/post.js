import {
  _addorUpdatePost
} from '../helpers/post.js';


export default {
  Query: {
    // getCities: async (_, args, {}) => {
    //   try {
    //     const result = await _getCities(args);
    //     return {
    //       status: 200,
    //       city: result.map(item => {
    //         return {
    //           id: item.id,
    //           name: item.name,
    //           longtitude: item.longtitude,
    //           latitude: item.latitude,
    //           stayFrom: item.stayFrom,
    //           stayTo: item.stayTo,
    //           days: item.days,
    //           cost: item.cost,
    //           rates: item.rates,
    //           transportation: item.transportation,
    //           review: item.review,
    //           photo_url: item.photo_url,
    //           createdAt: item.createdAt,
    //           updatedAt: item.updatedAt,
    //           travelListId: item.travelListId
    //         };
    //       })
    //     };
    //   } catch (err) {
    //     return {
    //       status: 500,
    //       message: err.message
    //     };
    //   }
    // }
  },

  Mutation: {
    addorUpdatePost: async (_, args, { user }) => {
      try {
        const userId = user.id;
        const result = await _addorUpdatePost(args, userId);
        return {
          status: 200,
          post: {
            id: result.id,
            text: result.text,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            userId: result.userId,
            travelListId: result.travelListId
          }
        };
      } catch (err) {
        return {
          status: 500,
          message: err.message
        };
      }
    },

    // deleteCity: async (_, args, {}) => {
    //   try {
    //     const result = await _deleteCity(args);
    //     return {
    //       status: 200,
    //       message: result
    //     };
    //   } catch (err) {
    //     return {
    //       status: 500,
    //       message: err.message
    //     };
    //   }
    // }
  }
};