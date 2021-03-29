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
        error: `Login user: ${JSON.stringify(user)}`,
      })
    );
  }
});

module.exports = { authRouter };
