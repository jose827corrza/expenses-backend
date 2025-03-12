import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/User.schema';

@Controller('users')
export class ControllersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
