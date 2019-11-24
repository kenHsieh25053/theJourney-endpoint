const jwt = require('jsonwebtoken');
import {
  AuthenticationError
} from 'apollo-server-express';


export const auth = async ({
  req
}) => {
  const token = req.headers['id_token'];
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
  return {};
};