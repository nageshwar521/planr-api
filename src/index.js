require('dotenv').config();
import { errorHandler } from './common/error.middleware';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { tasksRouter } from './tasks/tasks.router';
import { notFoundHandler } from './common/notFound.middleware';
import { authRouter } from './auth/auth.router';
import verifyToken from './auth/auth.middleware';
import { responseEnhancer } from 'express-response-formatter';

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

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
