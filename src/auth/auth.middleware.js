const jwt = require('jsonwebtoken');
const { getSecretAccessToken } = require('../common/common.utils');
const { generateErrorResponse } = require('../utils/generateResponse');

const verifyToken = (req, res, next) => {
  // console.log('middleware: basic auth');
  const authHeader = req.headers['authorization'] ?? '';
  const token = authHeader?.split(' ')[1];

  // console.log('token');
  // console.log(token);

  if (!token) {
    res
      .status(401)
      .send(generateErrorResponse({ message: 'token not found', error: null }));
  }
  try {
    const accessToken = getSecretAccessToken();
    jwt.verify(token, accessToken, (err, user) => {
      if (err) {
        res.status(403).send(
          generateErrorResponse({
            message: 'token verify failed',
            error: {
              err,
              token,
            },
          })
        );
      }

      req.body = { ...req.body, user };
      next();
    });
  } catch (error) {
    res.status(403).send(
      generateErrorResponse({
        message: 'secret token not found',
        error: null,
      })
    );
    next();
  }
};

module.exports = { verifyToken };
