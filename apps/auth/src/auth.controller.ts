import {
  Res,
  Post,
  Get,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { CreateUserRegister } from './dto/create-user-register.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() userAuthDto: UserAuthDto,
    @Res() response: Response,
  ): Promise<Response | undefined | void> {
    const { access_token, refresh_token } =
      await this.authService.login(userAuthDto);
    const responseWithJwt = await this.authService.setResCookie(
      response,
      'access_token',
      access_token,
    );
    const responseWithRefreshJwt = await this.authService.setResCookie(
      responseWithJwt,
      'refresh_token',
      refresh_token,
    );
    responseWithRefreshJwt.send({ status: 'OK' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() user: CreateUserRegister): Promise<any> {
    return await this.authService.register(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  async refreshToken() {
    return await this.authService.refreshToken();
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  async logOut() {
    return await this.authService.logOut();
  }
}
