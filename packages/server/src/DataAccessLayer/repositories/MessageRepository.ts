import { IMessageCreate } from 'monorepo-shared';
import Message from '../models/Message';
import ChatRepository from './ChatRepository';

class MessageRepository {
  async createMessage(params: IMessageCreate) {
    const newMessage = await Message.create(params);
    await ChatRepository.inserMessage(params.chat, newMessage);

    return newMessage;
  }

  async getMessages(params: { chatId: string }) {
    const messages = await Message.find({
      chat: params.chatId,
    }).populate('user');

    return messages;
  }
}

export default new MessageRepository();
