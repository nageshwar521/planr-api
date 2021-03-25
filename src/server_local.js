require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { tasksRouter } = require('./tasks/tasks.router');
const { authRouter } = require('./auth/auth.router');
const { verifyToken } = require('./auth/auth.middleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/', authRouter);
app.use('/tasks', verifyToken, tasksRouter);

// app.use(errorHandler);
// app.use(notFoundHandler);
// app.use(responseEnhancer);

// app.use('/.netlify/functions/server', router);

// module.exports = app;
// module.exports.handler = serverless(app);

app.listen(7000, () => {
  console.log('server listening at http://localhost:7000');
});
