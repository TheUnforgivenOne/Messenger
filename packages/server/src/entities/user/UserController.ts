import { Request, Response } from 'express';
import UserService from './UserService';
import catchErrors from '../../decorators/catchErrors';
import { validateSignInParams, validateUser } from 'monorepo-shared';
import createResponse from '../../utils/createResponse';

class UserController {
  @catchErrors
  async signUp(req: Request, res: Response) {
    const newUser = req.body;
    validateUser(newUser);

    const response = await UserService.signUpUser(newUser);

    res.cookie('token', response.data.token);
    res.json(createResponse(response));
  }

  @catchErrors
  async signIn(req: Request, res: Response) {
    const signInParams = req.body;
    validateSignInParams(signInParams);

    const response = await UserService.signInUser(signInParams);

    res.cookie('token', response.data.token);
    res.json(createResponse(response));
  }

  @catchErrors
  async signOut(req: Request, res: Response) {
    res.clearCookie('token');
    res.json(createResponse({ message: 'Logged out' }));
  }

  @catchErrors
  async getMyInfo(req: Request, res: Response) {
    res.json(createResponse({ data: { user: req.user } }));
  }

  @catchErrors
  async getUsers(req: Request, res: Response) {
    const query = req.query;

    const response = await UserService.getUsers(query);

    res.json(createResponse(response));
  }
}

export default new UserController();
