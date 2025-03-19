import { DataSource } from 'typeorm';
import { Expense } from './expenses/entities/expense.entity';
import { Project } from './expenses/entities/project.entity';
import { User } from './users/entities/user.entity';
import * as process from 'node:process';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_DATABASE_HOST,
  port: Number(process.env.TYPEORM_DATABASE_PORT),
  username: process.env.TYPEORM_DATABASE_USERNAME,
  password: process.env.TYPEORM_DATABASE_PASSWORD,
  database: process.env.TYPEORM_DATABASE_NAME,
  entities: [Expense, Project, User],
  migrations: [__dirname + '**/**/migrations/**{.js,.ts}'],
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log('Database Connected: '))
  .catch((err) => console.log(err));
