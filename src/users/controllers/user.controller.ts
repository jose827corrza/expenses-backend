import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/User.schema';
import { ParseObjectIdPipe } from '../../common/parse-object-id-pipe.service';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from '../dtos/user.dtos';

@Controller('users')
export class ControllersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getAnUser(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<User | null> {
    return this.userService.findByObjectId(id);
  }

  @Post()
  createUser(@Body() payload: CreateUserDto): Promise<User>{
    return this.userService.createNewUser(payload);
  }
}
