import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import {
  AddUserToProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
} from '../dtos/project.dtos';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('add')
  async addToProject(@Body() dto: AddUserToProjectDto) {
    // TODO implement the shareProjectWithNewUser method from the service and test it
    return this.projectService.shareProjectWithNewUser(
      dto.email,
      dto.projectId,
    );
  }

  @Post(':id')
  createProject(@Param('id') id: string, @Body() dto: CreateProjectDto) {
    return this.projectService.create(id, dto);
  }

  @Get(':id')
  getUserProjects(@Param('id') id: string) {
    return this.projectService.findUserProjects(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('project/:id')
  getProjectDetails(@Param('id') id: string) {
    return this.projectService.findProjectById(id);
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
