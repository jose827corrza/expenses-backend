import { Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ControllerController } from './controllers/controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Project } from './entities/project.entity';

@Module({
  providers: [ExpenseService],
  controllers: [ControllerController],
  imports: [TypeOrmModule.forFeature([Expense, Project])],
})
export class ExpenseModule {}
