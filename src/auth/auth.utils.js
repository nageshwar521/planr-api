const jwt = require('jsonwebtoken');

const createAuthToken = async (user, secretToken) => {
  return await jwt.sign(user, secretToken, { expiresIn: 5 * 60 });
};

module.exports = { createAuthToken };
