import { ISignInParams, IUser } from 'monorepo-shared';
import UserRepository, {
  UserQueryParamsType,
} from '../../DataAccessLayer/repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  private generateJwt(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET ?? 'easy_secret');
  }

  async signUpUser(userCreds: IUser) {
    // Check if username already taken
    const user = await UserRepository.getUser({ username: userCreds.username });
    if (user) throw new Error('This username is already taken');

    // Hash password
    const hashedPassword = await bcrypt.hash(userCreds.password, 5);

    // Create user
    const newUser = await UserRepository.createUser({
      ...userCreds,
      password: hashedPassword,
    });

    const token = this.generateJwt(newUser._id.toString());

    return {
      message: `User ${newUser.username} created`,
      data: { token, user: newUser },
    };
  }

  async signInUser(loginCreds: ISignInParams) {
    // Check if user exist
    const user = await UserRepository.getUser({
      username: loginCreds.username,
    });
    if (!user) throw new Error('Incorrect username');

    // Check password
    const passwordCorrect = await bcrypt.compare(
      loginCreds.password,
      user.password
    );
    if (!passwordCorrect) throw new Error('Incorrect password');

    const token = this.generateJwt(user._id.toString());

    return { message: 'Logged in', data: { token, user } };
  }

  async getUsers(query: UserQueryParamsType) {
    const users = await UserRepository.getUsers(query);

    return { data: { users } };
  }
}

export default new UserService();
