import {
  _touristSpotPost,
  _touristSpots,
  _touristSpotDelete
} from '../helpers/touristSpot.js';


export default {
  Query: {
    touristSpots: async (_, args) => {
      try {
        const result = await _touristSpots(args);
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
          message: err
        };
      }
    }
  },

  Mutation: {
    touristSpotPost: async (_, args) => {
      try {
        const result = await _touristSpotPost(args);
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
          message: err
        };
      }
    },

    touristSpotDelete: async (_, args) => {
      try {
        const result = await _touristSpotDelete(args);
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