import {
  // _addFriend,
  // _addedFriend,
  // _cancelFriendAdd,
  _friendActions
} from '../helpers/relationship.js';


export default {
  Query: {
    // cities: async (_, args, {}) => {
    //   try {
    //     const result = await _getCities(args);
    //     return {
    //       status: 200,
    //       cities: result.map(item => {
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
    // friendAdd: async (_, args, {
    //   user
    // }) => {
    //   try {
    //     const actionUserId = user.id;
    //     const result = await _addFriend(args, actionUserId);
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
    // },

    // friendAdded: async (_, {}, {
    //   user
    // }) => {
    //   try {
    //     const userId = user.id;
    //     const result = await _addedFriend(userId);
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
    // },

    // friendAddCancel: async (_, args, {
    //   user
    // }) => {
    //   try {
    //     const userId = user.id;
    //     const result = await _cancelFriendAdd(args, userId);
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
    // },

    friendActions: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _friendActions(args, userId);
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