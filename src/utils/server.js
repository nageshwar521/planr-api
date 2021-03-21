require('dotenv').config();
const serverless = require('serverless-http');
const { errorHandler } = require('./common/error.middleware');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { tasksRouter } = require('./tasks/tasks.router');
const { notFoundHandler } = require('./common/notFound.middleware');
const { authRouter } = require('./auth/auth.router');
const { verifyToken } = require('./auth/auth.middleware');
const { responseEnhancer } = require('express-response-formatter');
const router = express.Router();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
// app.use('/', authRouter);
// app.use('/tasks', verifyToken, tasksRouter);

// API calls
router.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

router.post('/api/world', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

// app.use(errorHandler);
// app.use(notFoundHandler);
// app.use(responseEnhancer);

app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);
