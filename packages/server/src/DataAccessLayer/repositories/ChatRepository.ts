import { IChatCreate, IMessage } from 'monorepo-shared';
import Chat from '../models/Chat';

class ChatRepository {
  async createChat(params: IChatCreate) {
    const newChat = await Chat.create(params);

    return newChat;
  }

  async inserMessage(chatId: string, message: IMessage) {
    const chat = await this.getChat(chatId);

    chat?.messages.push(message);
    chat?.save();
  }

  async getChat(chatId: string) {
    const chat = await Chat.findOne({ _id: chatId })
      .populate('users')
      .populate({ path: 'messages', populate: { path: 'user' } });

    return chat;
  }

  async getChatsByUser(userId: string) {
    const chats = await Chat.find({ users: { $in: [userId] } })
      .populate('users')
      .populate('messages');

    return chats;
  }
}

export default new ChatRepository();
