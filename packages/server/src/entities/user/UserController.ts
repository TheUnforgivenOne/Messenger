import { Request, Response } from 'express';
import UserService from './UserService';
import catchErrors from '../../decorators/catchErrors';
import { validateSignInParams, validateUser } from 'monorepo-shared';

class UserController {
  @catchErrors
  async signUp(req: Request, res: Response) {
    const newUser = req.body;
    validateUser(newUser);

    const response = await UserService.signUpUser(newUser);

    res.cookie('token', response.data.token);
    res.json(response);
  }

  @catchErrors
  async signIn(req: Request, res: Response) {
    const signInParams = req.body;
    validateSignInParams(signInParams);

    const response = await UserService.signInUser(signInParams);

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
