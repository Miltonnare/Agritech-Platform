import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { validationResult } from 'express-validator';
import { config } from '../config';

interface AuthTokens {
  token: string;
  refreshToken: string;
}

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

const generateTokens = (user: IUser): AuthTokens => {
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    config.jwtRefreshSecret,
    { expiresIn: '7d' }
  );

  return { token, refreshToken };
};

export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        errors: errors.array()
      });
    }

    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
        code: 'USER_EXISTS'
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      dateJoined: new Date(),
      role: 'farmer'
    });

    await user.save();

    // Generate tokens
    const { token, refreshToken } = generateTokens(user);

    // Return user data and tokens
    res.status(201).json({
      user: {
        email: user.email,
        name: user.name,
        dateJoined: user.dateJoined,
        role: user.role
      },
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Check if it's a MongoDB error
    const mongoError = error as any;
    if (mongoError.code === 11000) {
      return res.status(400).json({
        message: 'Email already exists',
        code: 'EMAIL_EXISTS'
      });
    }

    // Check for database connection errors
    if (mongoError.name === 'MongoError' || mongoError.name === 'MongooseError') {
      return res.status(503).json({
        message: 'Database connection error',
        code: 'DB_ERROR',
        ...(config.nodeEnv === 'development' && { 
          error: getErrorMessage(error),
          details: mongoError
        })
      });
    }

    res.status(500).json({
      message: 'Error creating user',
      code: 'SERVER_ERROR',
      ...(config.nodeEnv === 'development' && { 
        error: getErrorMessage(error),
        stack: mongoError.stack
      })
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Generate tokens
    const { token, refreshToken } = generateTokens(user);

    // Return user data and tokens
    res.json({
      user: {
        email: user.email,
        name: user.name,
        dateJoined: user.dateJoined,
        role: user.role,
        phone: user.phone,
        location: user.location,
        profileImage: user.profileImage
      },
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Error during login',
      code: 'SERVER_ERROR',
      ...(config.nodeEnv === 'development' && { error: getErrorMessage(error) })
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        message: 'Refresh token is required',
        code: 'TOKEN_REQUIRED'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid refresh token',
        code: 'INVALID_TOKEN'
      });
    }

    // Generate new access token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      message: 'Invalid refresh token',
      code: 'INVALID_TOKEN',
      ...(config.nodeEnv === 'development' && { error: getErrorMessage(error) })
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      message: 'Error fetching profile',
      code: 'SERVER_ERROR',
      ...(config.nodeEnv === 'development' && { error: getErrorMessage(error) })
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        errors: errors.array()
      });
    }

    const updates = {
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      profileImage: req.body.profileImage
    };

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      message: 'Error updating profile',
      code: 'SERVER_ERROR',
      ...(config.nodeEnv === 'development' && { error: getErrorMessage(error) })
    });
  }
}; 