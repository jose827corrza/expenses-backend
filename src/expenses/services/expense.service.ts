import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from '../entities/expense.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().exec();
  }
}
