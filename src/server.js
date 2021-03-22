require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { tasksRouter } = require('./tasks/tasks.router');
const { authRouter } = require('./auth/auth.router');
const { verifyToken } = require('./auth/auth.middleware');
const morgan = require('morgan');
const router = express.Router();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

router.use('/', authRouter);
router.use('/tasks', verifyToken, tasksRouter);

// app.use(errorHandler);
// app.use(notFoundHandler);

app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);
