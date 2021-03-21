import jwt from 'jsonwebtoken';
import { getSecretAccessToken } from '../common/common.utils';
import { generateErrorResponse } from '../utils/generateResponse';

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

  jwt.verify(token, getSecretAccessToken(), (err, user) => {
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
};

export default verifyToken;
