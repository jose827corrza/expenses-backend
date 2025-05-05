import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param, ParseUUIDPipe,
  Post,
  Put, Req, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import {
  AddUserToProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
} from '../dtos/project.dtos';
import { Request } from 'express';
import { Token } from '../../auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('add')
  async addToProject(@Body() dto: AddUserToProjectDto) {
    return await this.projectService.shareProjectWithNewUser(dto);
  }

  @Post()
  createProject(@Req() req: Request, @Body() dto: CreateProjectDto) {
    const user = req.user as Token;
    return this.projectService.create(user.sub, dto);
  }

  @Get()
  getUserProjects(@Req() req: Request) {
    const user = req.user as Token;
    return this.projectService.findUserProjects(user.sub);
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
