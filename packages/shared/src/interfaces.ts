export interface IResponseParams {
  error: boolean;
  message: string;
  data: any;
}

export interface ISignInParams {
  username: string;
  password: string;
}

export interface IUser extends ISignInParams {
  email: string;
}

export interface IMessage {
  date: Date;
  sent: boolean;
  viewed: boolean;
  message: string;
  user: IUser;
}

export interface IChat {
  title: string;
  users: IUser[];
  messages: IMessage[];
}
