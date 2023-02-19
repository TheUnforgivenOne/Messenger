import { Request, Response } from 'express';
import UserService from './UserService';
import catchErrors from '../../decorators/catchErrors';

class UserController {
  @catchErrors
  async register(req: Request, res: Response) {
    // Body validation
    const data = await UserService.registerUser(req.body);

    res.json(data);
  }

  @catchErrors
  async login(req: Request, res: Response) {
    // Body validation
    const data = await UserService.loginUser(req.body);

    res.json(data);
  }

  @catchErrors
  async logout(req: Request, res: Response) {
    const data = await UserService.logoutUser(req.body?.token);

    res.json(data);
  }
}

export default new UserController();
