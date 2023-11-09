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
import { UserAuthDto } from './dto/user-auth.dto';
import { CreateUserRegister } from './dto/create-user-register';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() userAuthDto: UserAuthDto,
    @Res() response: Response,
  ): Promise<Response | undefined | void> {
    const { access_token } = await this.authService.login(userAuthDto);
    response
      .cookie('access_token', access_token, {
        httpOnly: true,
        expires: this.authService.getExpire(),
      })
      .send({ status: 'OK' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() user: CreateUserRegister): Promise<any> {
    return await this.authService.register(user);
  }
}
