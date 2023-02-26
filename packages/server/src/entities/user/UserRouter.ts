import { Router } from 'express';
import verifyUser from '../../middlewares/verifyUser';
import UserController from './UserController';

const UserRouter = Router();

UserRouter.post('/signup', UserController.signUp);
UserRouter.post('/signin', UserController.signIn);
UserRouter.post('/signout', verifyUser, UserController.signOut);
UserRouter.get('/', verifyUser, UserController.getUsers);

export default UserRouter;
