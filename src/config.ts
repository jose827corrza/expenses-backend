import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('config', () => {
  return {
    database: {
      host: process.env.DATABASE_HOST,
      name: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT!, 10),
      type: process.env.DATABASE_TYPE,
      synchronize: process.env.DATABASE_SYNCHRONIZE,
    },
    dbCredentials: {
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    apiKey: process.env.API_KEY,
    environment: process.env.NODE_ENV,
  };
});
