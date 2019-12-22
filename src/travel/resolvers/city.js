import {
  _cities,
  _cityPost,
  _cityDelete
} from '../helpers/city.js';


export default {
  Query: {
    cities: async (_, args) => {
      try {
        const result = await _cities(args);
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
          message: err
        };
      }
    }
  },

  Mutation: {
    cityPost: async (_, args) => {
      try {
        const result = await _cityPost(args);
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
          message: err
        };
      }
    },

    cityDelete: async (_, args) => {
      try {
        const result = await _cityDelete(args);
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