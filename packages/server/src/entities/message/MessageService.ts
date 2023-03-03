import { IMessageCreate } from 'monorepo-shared';
import MessageRepository from '../../DataAccessLayer/repositories/MessageRepository';

class MessageService {
  async createMessage(message: IMessageCreate) {
    const newMessage = await MessageRepository.createMessage(message);

    return { data: newMessage };
  }
}

export default new MessageService();
