import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '../entities/expense.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto, UpdateExpenseDto } from '../dtos/expense.dtos';
import { ProjectService } from './project.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly projectService: ProjectService,
  ) {}

  async createExpenseForProject(projectId: string, expense: CreateExpenseDto) {
    const project = await this.projectService.findProjectById(projectId);

    const newExpense = this.expenseRepository.create(expense);
    newExpense.project = project;

    return await this.expenseRepository.save(newExpense);
  }

  async deleteExpense(id: string) {
    const project = await this.expenseRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} does not exist`);
    }

    return await this.expenseRepository.remove(project);
  }

  async updateExpense(id: string, changes: UpdateExpenseDto) {
    const expense = await this.expenseRepository.findOne({
      where: { id },
    });

    if (!expense) {
      throw new NotFoundException(`Project with id ${id} does not exist`);
    }

    this.expenseRepository.merge(expense, changes);
    return this.expenseRepository.save(expense);
  }
}
