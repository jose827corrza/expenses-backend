import {
  Column,
  Entity,
  JoinTable,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Project } from '../../expenses/entities/project.entity';
import { Expense } from '../../expenses/entities/expense.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ManyToMany(() => Project, (project) => project.users, { cascade: true })
  @JoinTable()
  projects: Project[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];
}
