import path from 'path';
import {
  fileLoader
} from 'merge-graphql-schemas';

const userTypesArray = fileLoader(path.join(__dirname, './schema'));
const userResolversArray = fileLoader(path.join(__dirname, './resolvers'));

module.exports = {
  userTypesArray,
  userResolversArray
};