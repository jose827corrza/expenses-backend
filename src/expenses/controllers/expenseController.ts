import { Controller, Get, Res } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  getExpenses() {
    return this.expenseService.findAll();
  }
}
