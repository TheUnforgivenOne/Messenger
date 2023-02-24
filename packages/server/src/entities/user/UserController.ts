import { Request, Response } from 'express';
import UserService from './UserService';
import catchErrors from '../../decorators/catchErrors';

class UserController {
  @catchErrors
  async signUp(req: Request, res: Response) {
    // Body validation
    const response = await UserService.signUpUser(req.body);

    res.cookie('token', response.data.token);
    res.json(response);
  }

  @catchErrors
  async signIn(req: Request, res: Response) {
    // Body validation
    const response = await UserService.signInUser(req.body);

    res.cookie('token', response.data.token);
    res.json(response);
  }

  @catchErrors
  async signOut(req: Request, res: Response) {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  }

  @catchErrors
  async getMyInfo(req: Request, res: Response) {
    const user = req.user;
    const response = { username: user.username, email: user.email };

    res.json({ data: response });
  }
}

export default new UserController();
