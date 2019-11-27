import path from 'path';
import {
  fileLoader
} from 'merge-graphql-schemas';

const travelTypesArray = fileLoader(path.join(__dirname, './schema'));
const travelResolversArray = fileLoader(path.join(__dirname, './resolvers'));

module.exports = {
  travelTypesArray,
  travelResolversArray
};