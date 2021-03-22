const jwt = require('jsonwebtoken');
const { getSecretAccessToken } = require('../common/common.utils');

const createAuthToken = (user, secretToken) => {
  return jwt.sign(user, secretToken, { expiresIn: '5m' });
};

module.exports = { createAuthToken };
