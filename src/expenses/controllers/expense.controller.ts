import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from '../dtos/expense.dtos';
import { Expense } from '../entities/expense.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { Token } from '../../auth/models/token.model';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post(':id')
  async createExpense(
    @Param('id') id: string,
    @Body() createExpenseDto: CreateExpenseDto,
    @Req() req: Request,
  ): Promise<Expense> {
    const user = req.user as Token;
    return await this.expenseService.createExpenseForProject(
      id,
      user.sub,
      createExpenseDto,
    );
  }

  @Get('project/:id')
  async getExpensesByProjectId(@Param('id') id: string): Promise<Expense[]> {
    return await this.expenseService.getExpensesByProjectId(id);
  }

  @Get('user')
  async getExpensesByUser(@Req() req: Request) {
    const user = req.user as Token;
    return await this.expenseService.getExpensesByUser(user.sub);
  }

  @Patch('expense/:id')
  async updateExpenseById(
    @Param(':id') expenseId: string,
    @Body() changes: UpdateExpenseDto,
  ) {
    return await this.expenseService.updateExpense(expenseId, changes);
  }
}
