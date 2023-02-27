import { Router } from 'express';
import verifyUser from '../../middlewares/verifyUser';
import ChatController from './ChatController';

const ChatRouter = Router();

ChatRouter.post('/new', verifyUser, ChatController.create);
ChatRouter.get('', verifyUser, ChatController.getChats);

export default ChatRouter;
