import {
  Res,
  Post,
  Get,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
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
    await this.authService.login(userAuthDto, response);
    response.send({ status: 'OK' });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() user: CreateUserRegister): Promise<any> {
    return await this.authService.register(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    await this.authService.refreshTokens(request, response);
    response.send({ status: 'OK' });
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout/:userEmail')
  async logOut(
    @Param('userEmail') userEmail: string,
    @Res() response: Response,
  ): Promise<Response | undefined | void> {
    this.authService.logOut(response, userEmail);
    response.send({ status: 'OK' });
  }
}
