import { Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ExpenseController } from './controllers/expenseController';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './entities/expense.schema';

@Module({
  providers: [ExpenseService],
  controllers: [ExpenseController],
  imports: [
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
  ],
})
export class ExpenseModule {}
