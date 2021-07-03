const jwt = require("jsonwebtoken");

const createAuthToken = async (user, secretToken) => {
  return await jwt.sign(user, secretToken, { expiresIn: 5 * 60 });
};

const createOtp = (length = 6) => {};

module.exports = { createAuthToken };
