import { Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ControllerController } from './controllers/controller.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './entities/expense.schema';

@Module({
  providers: [ExpenseService],
  controllers: [ControllerController],
  imports: [
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
  ],
})
export class ExpenseModule {}
