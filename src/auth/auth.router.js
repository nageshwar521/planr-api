//
// ─── REQUIRED EXTERNAL MODULES AND INTERFACES ───────────────────────────────────
//

const express = require("express");
const jwt = require("jsonwebtoken");
const { createAuthToken } = require("./auth.utils");
const {
  generateErrorResponse,
  generateSuccessResponse,
} = require("../utils/generateResponse");
const { accessTokenSecret } = require("../config");
import { SMTPClient } from "emailjs";
import { registerUser } from "./auth.service";

const smtpClient = new SMTPClient({
  user: "myplanrapp@gmail.com",
  password: "Nagesh@521",
  host: "smtp.gmail.com",
  ssl: true,
});

const refreshTokens = [];

//
// ─── ROUTER DEFINITION ──────────────────────────────────────────────────────────
//

var authRouter = express.Router();

//
// ─── CONTROLLER DEFINITIONS ─────────────────────────────────────────────────────
//

authRouter.get("/public", async (req, res) => {
  res.json(generateSuccessResponse());
});

//
// ─── LOGIN ──────────────────────────────────────────────────────────────────────
//

authRouter.post("/login", async (req, res) => {
  const user = req.body;
  // console.log("login user");
  // console.log(user);
  try {
    // console.log("login accessTokenSecret");
    // console.log(accessTokenSecret);
    const accessToken = jwt.sign(user, accessTokenSecret, {
      expiresIn: 3600,
    });
    // console.log("login accessToken");
    // console.log(accessToken);
    res.json(generateSuccessResponse({ accessToken }));
  } catch (error) {
    res.json(
      generateErrorResponse({
        error: `Login user: ${JSON.stringify(error)}`,
      })
    );
  }
});

//
// ─── REGISTER ──────────────────────────────────────────────────────────────────────
//

authRouter.post("/register", async (req, res) => {
  const user = req.body;
  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const registerResponse = await registerUser({ ...user, otpCode });
    const mailResponse = await smtpClient.sendAsync({
      text: "i hope this works",
      from: "Planr App <myplanrapp@gmail.com>",
      to: `${user.email} <${user.email}>`,
      subject: "Email Verification",
    });
    res.json(generateSuccessResponse({ registerResponse, mailResponse }));
  } catch (error) {
    res.json(
      generateErrorResponse({
        error: `Unknown error, please contact administrator`,
      })
    );
  }
});

//
// ─── REGISTER ──────────────────────────────────────────────────────────────────────
//

authRouter.post("/verify", async (req, res) => {
  const user = req.body;
  try {
    const registerResponse = await registerUser(user);
    const mailResponse = await smtpClient.sendAsync({
      text: "i hope this works",
      from: "Planr App <myplanrapp@gmail.com>",
      to: `${user.email} <${user.email}>`,
      subject: "Email Activation",
    });
    res.json(generateSuccessResponse({ registerResponse, mailResponse }));
  } catch (error) {
    res.json(
      generateErrorResponse({
        error: `Unknown error, please contact administrator`,
      })
    );
  }
});

module.exports = { authRouter };
