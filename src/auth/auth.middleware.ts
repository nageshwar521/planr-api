import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getSecretAccessToken } from '../common/common.utils';
import { generateErrorResponse } from '../utils/generateResponse';

export interface UserInterface {
  name?: string;
  username?: string;
  id: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // console.log('middleware: basic auth');
  const authHeader: string = req.headers['authorization'] ?? '';
  const token: string = authHeader?.split(' ')[1];

  // console.log('token');
  // console.log(token);

  if (!token) {
    res
      .status(401)
      .send(generateErrorResponse({ message: 'token not found', error: null }));
  }

  jwt.verify(
    token,
    getSecretAccessToken(),
    (err: jwt.VerifyErrors | null, user: object | undefined) => {
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
    }
  );
};

export default verifyToken;
