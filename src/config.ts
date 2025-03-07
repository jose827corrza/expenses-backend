import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    dbCredentials: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    apiKey: process.env.API_KEY,
  };
});
