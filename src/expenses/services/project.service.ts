import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dtos';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private userService: UserService,
  ) {}

  async create(userId: string, project: CreateProjectDto): Promise<Project> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }
    // TODO

    const newProject = new Project();
    newProject.name = project.name;
    newProject.description = project.description;
    newProject.users = [user];

    return await this.projectRepository.save(newProject);
  }

  async findUserProjects(userId: string): Promise<Project[]> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }
    return await this.projectRepository.find({ where: { users: user } });
  }

  async update(projectId: string, changes: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(
        `Project with id ${projectId} does not exist`,
      );
    }

    this.projectRepository.merge(project, changes);
    return this.projectRepository.save(project);
  }

  async delete(projectId: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(
        `Project with id ${projectId} does not exist`,
      );
    }

    return await this.projectRepository.remove(project);
  }
}
