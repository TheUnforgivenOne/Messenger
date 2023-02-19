import express, { Express, json } from 'express';
import UserRouter from './entities/user/UserRouter';

import requestsLogger from './middlewares/requestsLogger';
import noEndpointHandler from './middlewares/noEndpointHandler';
import errorsLogger from './middlewares/errorsLogger';

const PORT = process.env.PORT || 5000;

const initalizeApp = () => {
  const app: Express = express();

  app.use(requestsLogger, json());

  app.use('/user', UserRouter);
  app.use(noEndpointHandler);

  app.use(errorsLogger);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

export default initalizeApp;
