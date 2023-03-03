import { IChatCreate } from 'monorepo-shared';
import ChatRepository from '../../DataAccessLayer/repositories/ChatRepository';

class ChatService {
  async createChat(userId: string, params: IChatCreate) {
    const newChatParams: IChatCreate = {
      users: [...params.users, userId],
    };
    const newChat = await ChatRepository.createChat(newChatParams);

    return { message: 'New chat created', data: { chat: newChat } };
  }

  async getChat(chatId: string) {
    const chat = await ChatRepository.getChat(chatId);

    return { data: { chat } };
  }

  async getChatsByUser(userId: string) {
    const chats = await ChatRepository.getChatsByUser(userId);

    return { data: { chats } };
  }
}

export default new ChatService();
