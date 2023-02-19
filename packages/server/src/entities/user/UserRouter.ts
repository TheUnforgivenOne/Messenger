import { Router } from 'express';
import UserController from './UserController';

const UserRouter = Router();

UserRouter.post('/register', UserController.register);
UserRouter.post('/login', UserController.login);
UserRouter.post('/logout', UserController.logout);

export default UserRouter;
