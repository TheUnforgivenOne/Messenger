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
  async getUsers(req: Request, res: Response) {
    const query = req.query;
    const user = req.user;

    // If no query provided, return self user
    let response = {
      data: { users: [{ username: user.username, email: user.email }] },
    };

    if (Object.keys(query).length) {
      response = await UserService.getUsers(query);
    }

    res.json(response);
  }
}

export default new UserController();
