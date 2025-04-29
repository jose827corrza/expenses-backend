import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  private saltRounds = 10;

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    } else {
      return user;
    }
  }

  async createOne(userDto: CreateUserDto): Promise<User> {
    const searchUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (searchUser != null) {
      throw new BadRequestException(
        `User with email ${userDto.email} already exists`,
      );
    }
    const newUser = this.userRepository.create(userDto);
    newUser.password = await bcrypt.hash(newUser.password, 12);
    return this.userRepository.save(newUser);
  }

  async updateUser(id: string, payload: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    this.userRepository.merge(user, payload);
    return this.userRepository.save(user);
  }

  async removeUser(id: string): Promise<User> {
    const user = await this.findById(id);
    return this.userRepository.remove(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}
