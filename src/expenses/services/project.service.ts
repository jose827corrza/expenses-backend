import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import {
  AddUserToProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
} from '../dtos/project.dtos';
import { UserService } from '../../users/services/user.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async create(userId: string, project: CreateProjectDto): Promise<Project> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} does not exist`);
    }

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

  async findProjectById(id: string) {
    try {
      const project = await this.projectRepository.findOne({
        where: { id: id },
        relations: ['expenses'],
      });

      if (!project) {
        throw new NotFoundException();
      }
      return project;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async shareProjectWithNewUser(dto: AddUserToProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id: dto.projectId },
      relations: ['users'],
    });
    if (!project) {
      throw new NotFoundException();
    }
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    project?.users.push(user);
    return await this.projectRepository.save(project);
  }
}
