import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from '../entities/expense.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().exec();
  }

  async findByObjectId(id: ObjectId): Promise<Expense | null> {
    return this.expenseModel.findOne({ _id: id }).exec();
  }
}
