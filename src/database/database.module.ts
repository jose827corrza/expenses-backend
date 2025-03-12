import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigType } from '@nestjs/config';
import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        uri: configService.database.url,
        dbName: configService.database.name,
        auth: {
          username: configService.dbCredentials.user,
          password: configService.dbCredentials.password,
        },
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
