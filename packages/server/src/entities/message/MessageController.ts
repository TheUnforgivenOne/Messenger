import { Request, Response } from 'express';
import catchErrors from '../../decorators/catchErrors';
import MessageService from './MessageService';

class MessageController {
  @catchErrors
  async create(req: Request, res: Response) {
    const response = await MessageService.createMessage({
      user: req.userId,
      ...req.body,
    });

    res.json(response);
  }
}

export default new MessageController();
