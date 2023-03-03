import { Request, Response } from 'express';
import catchErrors from '../../decorators/catchErrors';
import ChatService from './ChatService';

class ChatController {
  @catchErrors
  async create(req: Request, res: Response) {
    // Validate body
    const response = await ChatService.createChat(req.userId, req.body);

    res.json(response);
  }

  @catchErrors
  async getChat(req: Request, res: Response) {
    const { chatId } = req.params;
    const response = await ChatService.getChat(chatId);

    res.json(response);
  }

  @catchErrors
  async getChatsByUser(req: Request, res: Response) {
    const resposne = await ChatService.getChatsByUser(req.userId);

    res.json(resposne);
  }
}

export default new ChatController();
