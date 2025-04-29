import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../../expenses/entities/project.entity';
import { User } from './user.entity';

@Entity({ name: 'project_users' })
export class UserProject {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // @ManyToOne(() => Project)
  // @JoinColumn({ name: 'project_id' })
  // project: Project;
  //
  // @ManyToOne(() => User, (user) => user.projects)
  // user: User;
}
