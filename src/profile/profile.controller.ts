import { Controller, Get, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from 'src/authentication/types/AuthRequest';
@ApiTags('Профиль')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  
  @Get()
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}