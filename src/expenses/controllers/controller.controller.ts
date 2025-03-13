import { Controller } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';

@Controller('expenses')
export class ControllerController {
  constructor(private readonly expenseService: ExpenseService) {}
}
