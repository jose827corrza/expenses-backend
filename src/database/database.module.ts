import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          host: configService.database.host,
          database: configService.database.name,
          port: configService.database.port,
          username: configService.dbCredentials.user,
          password: configService.dbCredentials.password,
          entities: [__dirname + './**/*.entity{.ts,.js}'],
          type: 'postgres',
          synchronize: true,
          // ssl: {
          //   rejectUnauthorized: false,
          // },
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
