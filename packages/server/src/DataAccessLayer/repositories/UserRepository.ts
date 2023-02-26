import { IUser } from 'monorepo-shared';
import User from '../models/User';

export type UserQueryParamsType = Partial<Omit<IUser, 'password'>>;

class UserRepository {
  // Find by query ignoring case
  private getFilterQuery(params: UserQueryParamsType) {
    return Object.keys(params).reduce((ps: any, p: string) => {
      Object.assign(ps, { [p]: { $regex: params[p], $options: 'i' } });
      return ps;
    }, {});
  }

  async createUser(user: IUser) {
    const newUser = await User.create(user);

    return newUser;
  }

  async getUserById(_id: string) {
    const user = await User.findOne({ _id });

    return user;
  }

  async getUser(queryParams: UserQueryParamsType) {
    const filterQuery = this.getFilterQuery(queryParams);
    const user = await User.findOne(filterQuery);

    return user;
  }

  async getUsers(queryParams: UserQueryParamsType) {
    const filterQuery = this.getFilterQuery(queryParams);
    const users = await User.find(filterQuery);

    return users;
  }
}

export default new UserRepository();
