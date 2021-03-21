import { UserInterface } from '../src/auth/auth.middleware';

declare namespace Express {
  export interface Request {
    user?: UserInterface;
  }
}
