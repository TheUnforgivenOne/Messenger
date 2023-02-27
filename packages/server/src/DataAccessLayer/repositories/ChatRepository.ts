import { ICreateChat } from 'monorepo-shared';
import Chat from '../models/Chat';

class ChatRepository {
  async createChat(params: ICreateChat) {
    const newChat = await Chat.create(params);

    return newChat;
  }

  async getChats(userId: string) {
    const chats = await Chat.find({ users: { $in: [userId] } }).populate(
      'users'
    );

    return chats;
  }
}

export default new ChatRepository();
