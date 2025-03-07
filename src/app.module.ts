import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expenses/expense.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import config from './config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'expenses_db',
      auth: {
        username: 'root',
        password: '123456',
      },
    }),
    ExpenseModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
