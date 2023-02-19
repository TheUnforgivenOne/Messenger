export interface ILoginParams {
  username: string;
  password: string;
}

export interface IUser extends ILoginParams {
  email: string;
}
