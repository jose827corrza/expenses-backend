import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getAllUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createOne(dto);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.removeUser(id);
  }
}
