import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expenses/expense.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import config from './config';

@Module({
  imports: [
    // mongodb://localhost:27017'
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: 'mongodb://localhost:27017',
        dbName: config.get<string>('DB_NAME'),
        auth: {
          username: config.get<string>('MONGO_USERNAME'),
          password: config.get<string>('MONGO_PASSWORD'),
        },
      }),
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
