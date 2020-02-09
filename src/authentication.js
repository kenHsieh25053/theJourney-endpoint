const jwt = require('jsonwebtoken');

export const authentication = async token => {
  if (token) {
    try {
      const user = await jwt.verify(token, process.env.JWT_SECRETKEY);
      return {
        user,
      };
    } catch (err) {
      return {
        status: 400,
        message: 'id_token is expired',
      };
    }
  }
  return '';
};
