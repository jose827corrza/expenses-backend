import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expenses/expense.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import config from './config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ExpenseModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
