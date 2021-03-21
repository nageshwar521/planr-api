import { UserInterface } from './auth.middleware';
import { NextFunction } from 'express';
//
// ─── REQUIRED EXTERNAL MODULES AND INTERFACES ───────────────────────────────────
//

import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import {
  getSecretAccessToken,
  getSecretRefreshToken,
} from '../common/common.utils';
import { createAuthToken } from './auth.utils';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '../utils/generateResponse';

const refreshTokens: string[] = [];

//
// ─── ROUTER DEFINITION ──────────────────────────────────────────────────────────
//

export const authRouter = express.Router();

//
// ─── CONTROLLER DEFINITIONS ─────────────────────────────────────────────────────
//

//
// ─── LOGIN ──────────────────────────────────────────────────────────────────────
//

authRouter.post('/login', async (req: Request, res: Response) => {
  const user = req.body;

  const secretRefreshToken = getSecretRefreshToken();

  const refreshToken = await jwt.sign(user, secretRefreshToken as Secret);
  const accessToken = createAuthToken(user);

  res.json(generateSuccessResponse({ accessToken, refreshToken }));
});

//
// ─── TOKEN ──────────────────────────────────────────────────────────────────────
//

authRouter.post(
  '/token',
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      res.status(401).send(
        generateErrorResponse({
          message: 'refreshToken not found!',
          error: null,
        })
      );
    }
    if (!refreshTokens.includes(refreshToken)) {
      res.status(403).send(
        generateErrorResponse({
          message: 'refreshToken is invalid!',
          error: null,
        })
      );
    }
    jwt.verify(
      refreshToken,
      getSecretRefreshToken(),
      async (err: any, user: any) => {
        if (err) {
          res.status(403).send(
            generateErrorResponse({
              message: 'refreshToken not found!',
              error: err,
            })
          );
        }
        const accessToken = createAuthToken(user);
        res.json(generateSuccessResponse({ accessToken }));
      }
    );
  }
);
