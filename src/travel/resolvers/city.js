import {
  postCity,
  getCities
} from '../helpers/city.js';


export default {
  Query: {
    cities: async (_, args, {}) => {
      try {
        const result = await getCities(args);
        return {
          status: 200,
          city: result.map(item => {
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
    city: async (_, args, {}) => {
      try {
        const result = await postCity(args);
        // console.log(result);
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
    }
  }
};