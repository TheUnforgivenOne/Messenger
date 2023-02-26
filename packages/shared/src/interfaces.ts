export interface ISignInParams {
  username: string;
  password: string;
}

export interface IUser extends ISignInParams {
  email: string;
}

export interface IResponseParams {
  error: boolean;
  message: string;
  data: any;
}
