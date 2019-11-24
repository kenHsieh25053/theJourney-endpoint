import {
  postTravelList
} from "../helpers/travelList.js";

export default {
  Query: {

  },
  Mutation: {
    travelList: async (_, args, {
      user
    }) => {
      const userId = user.id;
      return await postTravelList(userId, args);
    }
  }
};