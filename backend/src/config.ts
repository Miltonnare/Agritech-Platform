import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Default MongoDB URI components
const DEFAULT_MONGODB_HOST = 'localhost';
const DEFAULT_MONGODB_PORT = 27017;
const DEFAULT_MONGODB_DB = 'agrigrow';

// Construct MongoDB URI
const constructMongoDbUri = () => {
  const host = process.env.MONGODB_HOST || DEFAULT_MONGODB_HOST;
  const port = process.env.MONGODB_PORT || DEFAULT_MONGODB_PORT;
  const database = process.env.MONGODB_DB || DEFAULT_MONGODB_DB;
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;

  if (username && password) {
    return `mongodb://${username}:${password}@${host}:${port}/${database}`;
  }
  return `mongodb://${host}:${port}/${database}`;
};

export const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || constructMongoDbUri(),
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-key-change-in-production',
  corsOrigins: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',
    'http://127.0.0.1:5176',
    'http://127.0.0.1:5177'
  ] as readonly string[],
  nodeEnv: process.env.NODE_ENV || 'development',
} as const;

// Validate required configuration
const requiredEnvVars = ['mongodbUri', 'jwtSecret', 'jwtRefreshSecret'] as const;

for (const envVar of requiredEnvVars) {
  if (!config[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
} 