import { DataSource } from 'typeorm';
import { Expense } from './expenses/entities/expense.entity';
import { Project } from './expenses/entities/project.entity';
import { User } from './users/entities/user.entity';
import * as process from 'node:process';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '123456',
  database: 'expenses_db_dev',
  entities: [Expense, Project, User],
  migrations: [__dirname + '**/**/migrations/**{.js,.ts}'],
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log('Database Connected: '))
  .catch((err) => console.log(err));
