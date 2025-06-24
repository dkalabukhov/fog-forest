import { Request } from 'express';

export interface JwtPayload {
  role?: string;
  [key: string]: any;
}

export interface AuthenticatedRequest extends Request {
  cookies: {
    [key: string]: string;
  };
}
