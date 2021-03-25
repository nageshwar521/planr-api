//
// ─── REQUIRED EXTERNAL MODULES AND INTERFACES ───────────────────────────────────
//

const express = require('express');
const jwt = require('jsonwebtoken');
const { createAuthToken } = require('./auth.utils');
const {
  generateErrorResponse,
  generateSuccessResponse,
} = require('../utils/generateResponse');
const { accessTokenSecret } = require('../config');

const refreshTokens = [];

//
// ─── ROUTER DEFINITION ──────────────────────────────────────────────────────────
//

var authRouter = express.Router();

//
// ─── CONTROLLER DEFINITIONS ─────────────────────────────────────────────────────
//

authRouter.get('/public', async (req, res) => {
  res.json(generateSuccessResponse());
});

//
// ─── LOGIN ──────────────────────────────────────────────────────────────────────
//

authRouter.post('/login', async (req, res) => {
  const user = req.body;
  try {
    const accessToken = jwt.sign(user.username, accessTokenSecret);
    console.log('accessToken');
    console.log(accessToken);
    res.json(generateSuccessResponse({ accessToken }));
  } catch (error) {
    res.json(
      generateErrorResponse({
        error: `Login error: ${JSON.stringify(error)}`,
      })
    );
  }
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
    const accessToken = createAuthToken(user, getSecretRefreshToken);
    if (accessToken) {
      res.json(generateSuccessResponse({ accessToken }));
    } else {
      res.json(generateErrorResponse());
    }
  });
});

module.exports = { authRouter };
