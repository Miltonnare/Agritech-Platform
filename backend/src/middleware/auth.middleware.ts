import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

interface ErrorWithMessage {
  message: string;
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

const getErrorMessage = (error: unknown) => {
  return toErrorWithMessage(error).message;
};

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'No token provided',
        code: 'NO_TOKEN'
      });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({
        message: 'Invalid token format',
        code: 'INVALID_TOKEN_FORMAT'
      });
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as {
        userId: string;
        email: string;
        role: string;
      };

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Invalid or expired token',
        code: 'INVALID_TOKEN',
        ...(config.nodeEnv === 'development' && { error: getErrorMessage(error) })
      });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      message: 'Server error during authentication',
      code: 'SERVER_ERROR',
      ...(config.nodeEnv === 'development' && { error: getErrorMessage(error) })
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access forbidden',
        code: 'FORBIDDEN',
        ...(config.nodeEnv === 'development' && { 
          requiredRoles: roles,
          userRole: req.user.role 
        })
      });
    }
    next();
  };
}; 