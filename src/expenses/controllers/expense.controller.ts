import { Controller, Get, Param } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { ParseObjectIdPipe } from '../../common/parse-object-id-pipe.service';
import { ObjectId } from 'mongoose';
import { Expense } from '../entities/expense.schema';

@Controller('expenses')
export class ControllerController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  getExpenses() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  getAnExpense(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<Expense | null> {
    return this.expenseService.findByObjectId(id);
  }
}
