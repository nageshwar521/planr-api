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
  const secretToken = getSecretAccessToken();
  if (secretToken) {
    jwt.verify(token, secretToken, (err, user) => {
      if (err) {
        res.status(403).send(
          generateErrorResponse({
            message: 'session timeout',
            error: err,
          })
        );
      }

      req.body = { ...req.body, user };
      next();
    });
  } else {
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
