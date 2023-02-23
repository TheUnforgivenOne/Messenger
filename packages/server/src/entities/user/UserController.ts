import { Request, Response } from 'express';
import UserService from './UserService';
import catchErrors from '../../decorators/catchErrors';

class UserController {
  @catchErrors
  async signUp(req: Request, res: Response) {
    // Body validation
    const response = await UserService.signUpUser(req.body);

    res.cookie('username', response.data.username);
    res.cookie('token', response.data.token);
    res.json(response);
  }

  @catchErrors
  async signIn(req: Request, res: Response) {
    // Body validation
    const response = await UserService.signInUser(req.body);

    res.cookie('username', response.data.username);
    res.cookie('token', response.data.token);
    res.json(response);
  }

  @catchErrors
  async signOut(req: Request, res: Response) {
    const response = await UserService.signOutUser(req?.userId);

    res.clearCookie('username');
    res.clearCookie('token');
    res.json(response);
  }
}

export default new UserController();
