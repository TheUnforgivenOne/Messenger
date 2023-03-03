import { Router } from 'express';
import verifyUser from '../../middlewares/verifyUser';
import ChatController from './ChatController';

const ChatRouter = Router();

ChatRouter.post('/new', verifyUser, ChatController.create);
ChatRouter.get('/my', verifyUser, ChatController.getChatsByUser);
ChatRouter.get('/:chatId', verifyUser, ChatController.getChat);

export default ChatRouter;
