import { IMessageCreate } from 'monorepo-shared';
import Message from '../models/Message';
import ChatRepository from './ChatRepository';

class MessageRepository {
  async createMessage(params: IMessageCreate) {
    const newMessage = await Message.create(params);
    await ChatRepository.inserMessage(params.chat, newMessage);

    return newMessage;
  }
}

export default new MessageRepository();
