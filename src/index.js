require('dotenv').config();
const { errorHandler } = require('./common/error.middleware');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { tasksRouter } = require('./tasks/tasks.router');
const { notFoundHandler } = require('./common/notFound.middleware');
const { authRouter } = require('./auth/auth.router');
const { verifyToken } = require('./auth/auth.middleware');
const { responseEnhancer } = require('express-response-formatter');

if (!process.env.PORT) {
  process.exit(1);
}
// console.log('process.env');
// console.log(process.env);
const PORT = +process.env.PORT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/', authRouter);
app.use('/tasks', verifyToken, tasksRouter);

app.use(errorHandler);
app.use(notFoundHandler);
app.use(responseEnhancer);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
