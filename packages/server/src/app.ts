import express, { Express, json } from 'express';
import UserRouter from './entities/user/UserRouter';

import requestsLogger from './middlewares/requestsLogger';
import errorsLogger from './middlewares/errorsLogger';
import cookieParser from 'cookie-parser';

import noEndpointHandler from './middlewares/noEndpointHandler';
import verifyUser from './middlewares/verifyUser';

const PORT = process.env.PORT || 5000;

const initalizeApp = () => {
  const app: Express = express();

  app.use(requestsLogger, json(), cookieParser());

  app.use('/user', UserRouter);
  app.use('/', verifyUser, (req, res) => {
    res.json({ message: 'hello there' });
  });
  app.use(noEndpointHandler);

  app.use(errorsLogger);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

export default initalizeApp;
