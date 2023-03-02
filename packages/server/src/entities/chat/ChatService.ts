import { IChatCreate } from 'monorepo-shared';
import ChatRepository from '../../DataAccessLayer/repositories/ChatRepository';

class ChatService {
  async createChat(userId: string, params: IChatCreate) {
    const newChatParams: IChatCreate = {
      title: 'Chat',
      users: [...params.users, userId],
    };
    const newChat = await ChatRepository.createChat(newChatParams);

    return { message: 'New chat created', data: { newChat } };
  }

  async getChats(userId: string) {
    const chats = await ChatRepository.getChats(userId);

    return { data: { chats } };
  }
}

export default new ChatService();
