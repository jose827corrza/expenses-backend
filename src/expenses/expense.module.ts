import { Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ExpenseController } from './controllers/expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Project } from './entities/project.entity';
import { ProjectService } from './services/project.service';
import { UsersModule } from '../users/users.module';
import { ProjectController } from './controllers/project.controller';

@Module({
  providers: [ExpenseService, ProjectService],
  controllers: [ExpenseController, ProjectController],
  imports: [UsersModule, TypeOrmModule.forFeature([Expense, Project])],
})
export class ExpenseModule {}
