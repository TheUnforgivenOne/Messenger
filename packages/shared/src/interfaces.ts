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
  message: string;
  user: string;
  chat: string;
}
export interface IMessage extends Omit<IMessageCreate, 'user' | 'chat'> {
  _id: string;
  date: Date;
  sent: boolean;
  viewed: boolean;
  user: IUser;
  chat: IChat;
}

// Chat interfaces
export interface IChatCreate {
  title: string;
  users: string[];
}
export interface IChat extends Omit<IChatCreate, 'users'> {
  _id: string;
  users: IUser[];
  messages: IMessage[];
}
