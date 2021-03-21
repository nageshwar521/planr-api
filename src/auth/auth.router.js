//
// ─── REQUIRED EXTERNAL MODULES AND INTERFACES ───────────────────────────────────
//

import express from 'express';
import jwt from 'jsonwebtoken';
import { getSecretRefreshToken } from '../common/common.utils';
import { createAuthToken } from './auth.utils';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '../utils/generateResponse';

const refreshTokens = [];

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

authRouter.post('/login', async (req, res) => {
  const user = req.body;

  const secretRefreshToken = getSecretRefreshToken();

  const refreshToken = await jwt.sign(user, secretRefreshToken);
  const accessToken = createAuthToken(user);

  res.json(generateSuccessResponse({ accessToken, refreshToken }));
});

//
// ─── TOKEN ──────────────────────────────────────────────────────────────────────
//

authRouter.post('/token', async (req, res, next) => {
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
  jwt.verify(refreshToken, getSecretRefreshToken(), async (err, user) => {
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
  });
});
