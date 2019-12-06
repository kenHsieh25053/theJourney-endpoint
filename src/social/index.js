import path from 'path';
import {
  fileLoader
} from 'merge-graphql-schemas';

const socialTypesArray = fileLoader(path.join(__dirname, './schema'));
const socialResolversArray = fileLoader(path.join(__dirname, './resolvers'));

module.exports = {
  socialTypesArray,
  socialResolversArray
};