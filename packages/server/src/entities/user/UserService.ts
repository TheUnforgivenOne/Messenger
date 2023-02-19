import { ILoginParams, IUser } from 'monorepo-shared';
import UserRepository from '../../dataAccess/repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  async registerUser(userCreds: IUser) {
    // Check if username already taken
    const user = await UserRepository.getUserByUsername(userCreds.username);
    if (user) throw new Error('This username is already taken');

    // Hash password
    const hashedPassword = await bcrypt.hash(userCreds.password, 5);

    // CreateUser
    const newUser = await UserRepository.createUser({
      ...userCreds,
      password: hashedPassword,
    });

    return { message: `User ${newUser.username} created` };
  }

  async loginUser(loginCreds: ILoginParams) {
    // Check if user exist
    const user = await UserRepository.getUserByUsername(loginCreds.username);
    if (!user) throw new Error('Incorrect username');

    // Check password
    const passwordCorrect = await bcrypt.compare(
      loginCreds.password,
      user.password
    );
    if (!passwordCorrect) throw new Error('Incorrect password');

    // Generate jwt
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );

    return { message: 'Logged in', data: { token } };
  }

  async logoutUser(token: string) {
    // Decode token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exist
    const user = UserRepository.getUserById(decodedToken?.userId);
    if (!user) throw new Error('Wrong user id');

    return { message: 'Logged out' };
  }
}

export default new UserService();
