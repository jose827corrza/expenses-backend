import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { CreateExpenseDto } from '../dtos/expense.dtos';
import { Expense } from '../entities/expense.entity';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post(':id')
  async createExpense(
    @Param('id') id: string,
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<Expense> {
    return await this.expenseService.createExpenseForProject(
      id,
      createExpenseDto,
    );
  }

  @Get('project/:id')
  async getExpensesByProjectId(@Param('id') id: string): Promise<Expense[]> {
    return await this.expenseService.getExpensesByProjectId(id);
  }
}
