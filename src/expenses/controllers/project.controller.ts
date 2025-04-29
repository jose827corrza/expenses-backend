import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param, ParseUUIDPipe,
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
    return await this.projectService.shareProjectWithNewUser(dto);
  }

  @Post(':id')
  createProject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateProjectDto) {
    return this.projectService.create(id, dto);
  }

  @Get(':id')
  getUserProjects(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.findUserProjects(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('project/:id')
  getProjectDetails(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.findProjectById(id);
  }

  @Put(':id')
  updateProject(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  deleteProject(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectService.delete(id);
  }
}
