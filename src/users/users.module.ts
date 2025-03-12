import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { ControllersController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/User.schema';

@Module({
  providers: [UserService],
  controllers: [ControllersController],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class UsersModule {}
