import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { Token } from '../../auth/models/token.model';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  // getAllUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
  getAllUser(@Req() req: Request) {
    const user = req.user as Token;
    return this.userService.findById(user.sub);
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
