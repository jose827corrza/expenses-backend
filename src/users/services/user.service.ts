import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/User.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from '../dtos/user.dtos';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByObjectId(id: ObjectId): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async createNewUser(dto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(dto);
    return await newUser.save();
  }

  async addExpenseToUser(expenseId: string, userId: ObjectId): Promise<User> {
    const filter = { _id: userId };
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException();
    }
    // TODO Append the expense ObjetId to the Array
    const userw = await this.userModel.findOneAndUpdate();
    this.userModel
    // TODO
  }
}
