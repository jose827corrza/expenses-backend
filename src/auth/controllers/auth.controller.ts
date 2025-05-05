import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dtos/auth.dtos';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request } from 'express';
import { Token } from '../models/token.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Body() credentials: CredentialsDto) {
    return this.authService.signIn(credentials.email, credentials.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user as Token;
  }
}
