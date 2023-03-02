export interface IResponseParams {
  error: boolean;
  message: string;
  data: any;
}

// User interfaces
export interface ISignInParams {
  username: string;
  password: string;
}
export interface IUserCreate extends ISignInParams {
  email: string;
}
export interface IUser extends IUserCreate {
  _id: string;
}

// Message interfaces
export interface IMessageCreate {
  date: Date;
  sent: boolean;
  viewed: boolean;
  message: string;
  user: string;
}
export interface IMessage extends Omit<IMessageCreate, 'user'> {
  _id: string;
  user: IUser;
}

// Chat interfaces
export interface IChatCreate {
  title: string;
  users: string[];
}
export interface IChat extends Omit<IChatCreate, 'users'> {
  users: IUser[];
  messages: IMessage[];
}
