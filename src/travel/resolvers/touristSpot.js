import {
  _postTouristSpot,
  _getTouristSpots,
  _deleteTouristSpot
} from '../helpers/touristSpot.js';


export default {
  Query: {
    getTouristSpots: async (_, args, {}) => {
      try {
        const result = await _getTouristSpots(args);
        return {
          status: 200,
          touristSpots: result.map(item => {
            return {
              id: item.id,
              name: item.name,
              type: item.type,
              longtitude: item.longtitude,
              latitude: item.latitude,
              days: item.days,
              cost: item.cost,
              rates: item.rates,
              transportation: item.transportation,
              review: item.review,
              photo_url: item.photo_url,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              cityId: item.cityId
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
    postTouristSpot: async (_, args, {}) => {
      try {
        const result = await _postTouristSpot(args);
        return {
          status: 200,
          touristSpot: {
            id: result.id,
            name: result.name,
            type: result.type,
            longtitude: result.longtitude,
            latitude: result.latitude,
            days: result.days,
            cost: result.cost,
            rates: result.rates,
            transportation: result.transportation,
            review: result.review,
            photo_url: result.photo_url,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            cityId: result.cityId
          }
        };
      } catch (err) {
        return {
          status: 500,
          message: err.message
        };
      }
    },

    deleteTouristSpot: async (_, args, {}) => {
      try {
        const result = await _deleteTouristSpot(args);
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