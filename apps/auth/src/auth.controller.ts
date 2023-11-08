import {
  Post,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';

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
      .send({ status: 'ok' });
  }
}
