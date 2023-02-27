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
  async getChats(req: Request, res: Response) {
    const resposne = await ChatService.getChats(req.userId);

    res.json(resposne);
  }
}

export default new ChatController();
