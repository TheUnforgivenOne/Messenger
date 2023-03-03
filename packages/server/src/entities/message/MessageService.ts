import { IMessageCreate } from 'monorepo-shared';
import MessageRepository from '../../DataAccessLayer/repositories/MessageRepository';

class MessageService {
  async createMessage(message: IMessageCreate) {
    const newMessage = await MessageRepository.createMessage(message);

    return { data: newMessage };
  }

  async getMessages(params: { chatId: string, from: Date }) {
    const messages = MessageRepository.getMessages(params);

    return { data: { messages } };
  }
}

export default new MessageService();
