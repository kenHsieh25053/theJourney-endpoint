const jwt = require('jsonwebtoken');
import {
  AuthenticationError
} from 'apollo-server-express';


export const auth = async (token) => {
  if (token) {
    try {
      const user = await jwt.verify(token, process.env.JWT_SECRETKEY);
      return {
        user
      };
    } catch (err) {
      throw new AuthenticationError('Id_token expired');
    }
  }
  return '';
};