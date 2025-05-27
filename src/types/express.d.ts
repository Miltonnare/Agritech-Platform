import { Express as ExpressType } from 'express-serve-static-core';

declare module 'express' {
  export interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export {}; 