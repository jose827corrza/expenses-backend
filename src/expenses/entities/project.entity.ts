import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expense } from './expense.entity';
import { User } from '../../users/entities/user.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Expense, (expense) => expense.project)
  @JoinTable()
  expenses: Expense[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  users: User[];

  @Expose({ toPlainOnly: false })
  get total() {
    if (this.expenses) {
      return this.expenses
        .filter((expense) => !!expense)
        .reduce((total, expense) => {
          const totalExpense = expense.value;
          return total + totalExpense;
        }, 0);
    }
    return 0;
  }
}
