import {
  _travelLists,
  _travelListsAll,
  _travelListPost,
  _travelListDelete
} from '../helpers/travelList.js';

export default {
  Query: {
    travelLists: async (_, args, {
      user
    }) => {
      const userId = user.id;
      try {
        const result = await _travelLists(args, userId);
        return {
          status: 200,
          travelLists: result.map(item => {
            return {
              id: item.id,
              name: item.name,
              tags: item.tags,
              types: item.types,
              stayFrom: item.stayFrom,
              stayTo: item.stayTo,
              days: item.days,
              costs: item.costs,
              rates: item.rates,
              likes: item.likes,
              comments: item.comments,
              permissions: item.permissions,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              transportation: item.transportation,
              review: item.review,
              countries: item.countries,
              userId: item.userId,
              cities: item.cities
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

    travelListsAll: async (_, args, {
      user
    }) => {
      try {
        const userId = user.id;
        const result = await _travelListsAll(args, userId);
        return {
          status: 200,
          travelLists: result.map(item => {
            return {
              id: item.id,
              name: item.name,
              tags: JSON.parse(item.tags),
              types: item.types,
              stayFrom: item.stayFrom,
              stayTo: item.stayTo,
              days: item.days,
              comments: item.comments,
              permissions: item.permissions,
              costs: item.costs,
              rates: item.rates,
              likes: item.likes,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              transportation: item.transportation,
              review: item.review,
              countries: JSON.parse(item.countries),
              userId: item.userId,
              cities: item.cities
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
        const result = await _travelListPost(args.input, userId);
        if (result.cities.length > 0) {
          return {
            status: 200,
            travelLists: {
              id: result.id,
              name: result.name,
              tags: result.tags,
              types: result.types,
              stayFrom: result.stayFrom,
              stayTo: result.stayTo,
              days: result.days,
              costs: result.costs,
              rates: result.rates,
              likes: result.likes,
              comments: result.comments,
              permissions: result.permissions,
              createdAt: result.createdAt,
              updatedAt: result.updatedAt,
              transportation: result.transportation,
              review: result.review,
              countries: result.countries,
              userId: result.userId,
              cities: result.cities.map(city => {
                return {
                  id: city.id,
                  name: city.name,
                  longitude: city.longitude,
                  latitude: city.latitude,
                  stayFrom: city.stayFrom,
                  stayTo: city.stayTo,
                  costs: city.costs,
                  rates: city.rates,
                  transportation: city.transportation,
                  review: city.review,
                  photo_url: city.photo_url,
                  createdAt: city.createdAt,
                  updatedAt: city.updatedAt,
                  travelListId: city.travelListId,
                  touristSpots: city.touristSpots.map(touristSpot => {
                    return {
                      id: touristSpot.id,
                      name: touristSpot.name,
                      type: touristSpot.type,
                      longitude: touristSpot.longitude,
                      latitude: touristSpot.latitude,
                      days: touristSpot.days,
                      costs: touristSpot.costs,
                      rates: touristSpot.rates,
                      transportation: touristSpot.transportation,
                      review: touristSpot.review,
                      photo_url: touristSpot.photo_url,
                      createdAt: touristSpot.createdAt,
                      updatedAt: touristSpot.updatedAt,
                      cityId: touristSpot.cityId,
                    }
                  })
                }
              })
            }
          };
        } else {
          return {
            status: 200,
            travelLists: {
              id: result.id,
              name: result.name,
              tags: result.tags,
              types: result.types,
              stayFrom: result.stayFrom,
              stayTo: result.stayTo,
              days: result.days,
              costs: result.costs,
              rates: result.rates,
              likes: result.likes,
              comments: result.comments,
              permissions: result.permissions,
              createdAt: result.createdAt,
              updatedAt: result.updatedAt,
              transportation: result.transportation,
              review: result.review,
              countries: result.countries,
              userId: result.userId,
              cities: []
            }
          };
        }
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
