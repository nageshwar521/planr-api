import { UserInterface } from '../src/auth/auth.middleware';

declare global {
  declare module 'express' {
    export interface Request {
      user?: UserInterface;
    }
  }
}
