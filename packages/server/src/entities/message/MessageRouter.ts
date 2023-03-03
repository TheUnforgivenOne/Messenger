import { Router } from 'express';
import verifyUser from '../../middlewares/verifyUser';
import MessageController from './MessageController';

const MessageRouter = Router();

MessageRouter.post('', verifyUser, MessageController.create);

export default MessageRouter;
