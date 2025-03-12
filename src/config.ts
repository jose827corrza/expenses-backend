import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('config', () => {
  return {
    database: {
      url: process.env.DB_URL,
      name: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    dbCredentials: {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    apiKey: process.env.API_KEY,
    env: process.env.NODE_ENV,
  };
});
