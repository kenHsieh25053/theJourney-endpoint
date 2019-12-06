import {
  makeExecutableSchema
} from 'graphql-tools';
import {
  mergeTypes,
  mergeResolvers
} from 'merge-graphql-schemas';
import {
  userTypesArray,
  userResolversArray
} from './user/index.js';
import {
  travelTypesArray,
  travelResolversArray
} from './travel/index.js';
import {
  socialTypesArray,
  socialResolversArray
} from './social/index.js';


export const schema = makeExecutableSchema({
  typeDefs: mergeTypes(userTypesArray.concat(travelTypesArray, socialTypesArray), {
    all: true
  }),
  resolvers: mergeResolvers(userResolversArray.concat(travelResolversArray, socialResolversArray)),
  resolverValidationOptions :{
    requireResolversForResolveType: false
  }
});