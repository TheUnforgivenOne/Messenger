import { IUser } from 'monorepo-shared';
import User from '../models/User';

class UserRepository {
  async createUser(user: IUser) {
    const newUser = await User.create(user);

    return newUser;
  }

  async getUserById(_id: string) {
    const user = await User.findOne({ _id });

    return user;
  }

  async getUserByUsername(username: string) {
    const user = await User.findOne({ username });

    return user;
  }

  async getUsers(substring: string) {
    const users = await User.find({
      username: { $regex: substring, $options: 'i' },
    });

    return users;
  }
}

export default new UserRepository();
