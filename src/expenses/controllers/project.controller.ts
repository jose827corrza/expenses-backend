import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dtos';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post(':id')
  createProject(@Param('id') id: string, @Body() dto: CreateProjectDto) {
    return this.projectService.create(id, dto);
  }

  @Get(':id')
  getUserProjects(@Param('id') id: string) {
    return this.projectService.findUserProjects(id);
  }

  @Put(':id')
  updateProject(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
