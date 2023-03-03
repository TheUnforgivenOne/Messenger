import express, { Express, json } from 'express';
import UserRouter from './entities/user/UserRouter';
import ChatRouter from './entities/chat/ChatRouter';
import MessageRouter from './entities/message/MessageRouter';

import requestsLogger from './middlewares/requestsLogger';
import errorsLogger from './middlewares/errorsLogger';
import cookieParser from 'cookie-parser';

import noEndpointHandler from './middlewares/noEndpointHandler';

const PORT = process.env.PORT || 5000;

const initalizeApp = () => {
  const app: Express = express();

  app.use(requestsLogger, json(), cookieParser());

  app.use('/user', UserRouter);
  app.use('/chat', ChatRouter);
  app.use('/message', MessageRouter);
  app.use(noEndpointHandler);

  app.use(errorsLogger);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

export default initalizeApp;
