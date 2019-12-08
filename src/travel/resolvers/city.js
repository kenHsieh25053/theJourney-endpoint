import {
  _postCity,
  _getCities,
  _deleteCity
} from '../helpers/city.js';


export default {
  Query: {
    getCities: async (_, args, {}) => {
      try {
        const result = await _getCities(args);
        return {
          status: 200,
          cities: result.map(item => {
            return {
              id: item.id,
              name: item.name,
              longtitude: item.longtitude,
              latitude: item.latitude,
              stayFrom: item.stayFrom,
              stayTo: item.stayTo,
              days: item.days,
              cost: item.cost,
              rates: item.rates,
              transportation: item.transportation,
              review: item.review,
              photo_url: item.photo_url,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              travelListId: item.travelListId
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
    postCity: async (_, args, {}) => {
      try {
        const result = await _postCity(args);
        return {
          status: 200,
          city: {
            id: result.id,
            name: result.name,
            longtitude: result.longtitude,
            latitude: result.latitude,
            stayFrom: result.stayFrom,
            stayTo: result.stayTo,
            days: result.days,
            cost: result.cost,
            rates: result.rates,
            transportation: result.transportation,
            review: result.review,
            photo_url: result.photo_url,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
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

    deleteCity: async (_, args, {}) => {
      try {
        const result = await _deleteCity(args);
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