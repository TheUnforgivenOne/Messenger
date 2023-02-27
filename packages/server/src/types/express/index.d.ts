import { IUser } from 'monorepo-shared';

export {};

declare global {
  namespace Express {
    export interface Request {
      userId: string;
      user: IUser;
    }
  }
}
