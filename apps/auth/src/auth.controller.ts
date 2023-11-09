import {
  Res,
  Post,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto, @Res() response: Response) {
    const { access_token } = await this.authService.login(createAuthDto);
    response
      .cookie('access_token', access_token, {
        httpOnly: true,
        expires: this.authService.getExpire(),
      })
      .send({ status: 'OK' });
  }
}
