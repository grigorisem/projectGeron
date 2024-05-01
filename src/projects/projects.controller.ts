import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/authentication/types/AuthRequest';
import { GetProjectFindAllResponse } from './response/get-project-find-all.response';
import { GetParticipantsResponse } from './response/get-participants-response';

@ApiTags('Проекты')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create( 
    @Request() req: AuthRequest,
    @Body() createProjectDto: CreateProjectDto) 
    {
    return this.projectsService.create(req.user, createProjectDto);
  }

  @ApiOkResponse({ type: GetProjectFindAllResponse })
  @Get()
  findAll(@Query() req: AuthRequest) {
    return this.projectsService.findAll(req.user);
  }
  @ApiResponse({ type: GetParticipantsResponse })
  @Get(':id/participants')
  findParticipants(@Param('id') id: string) {
    return this.projectsService.findParticipants(id);
  }
}