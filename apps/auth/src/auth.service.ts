import { env } from 'process';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from './dto/user-auth.dto';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserRegister } from './dto/create-user-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  private async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, parseInt(env.SALT));
  }

  private async isUserExisting(
    user: CreateUserRegister,
  ): Promise<CreateUserRegister | null> {
    return await this.prismaService.users.findUnique({
      where: { email: user.email },
    });
  }

  public async register(user: CreateUserRegister): Promise<CreateUserRegister> {
    if ((await this.isUserExisting(user)) != null) {
      throw new UnauthorizedException();
    }
    user.password = await this.generateHash(user.password);
    user.email = user.email.toLowerCase();
    return await this.prismaService.users.create({ data: user });
  }

  private async generateToken(payload: object, secret: string) {
    return await this.jwtService.signAsync(payload, {
      secret: secret,
    });
  }

  public async login(user: UserAuthDto): Promise<any> {
    const currentUser = await this.prismaService.users.findUnique({
      where: { email: user.email },
    });

    if (!currentUser) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      currentUser?.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: currentUser.id,
      email: currentUser.email,
      lastName: currentUser.lastName,
      firstName: currentUser.firstName,
    };

    const accessToken = await this.generateToken(payload, env.JWT_SECRET);
    const refreshToken = await this.generateToken(
      payload,
      env.REFRESH_JWT_SECRET,
    );

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  private getExpire(): Date {
    const expires = new Date();
    const expiresDate = expires.setSeconds(
      expires.getSeconds() + Number(env.JWT_EXPIRATION),
    );
    return new Date(expiresDate);
  }

  public async setResCookie(
    response: Response,
    key: string,
    value: string,
  ): Promise<Response> {
    return response.cookie(key, value, {
      httpOnly: true,
      expires: this.getExpire(),
    });
  }

  public refreshToken() {
    return null;
  }

  public logOut() {
    return null;
  }
}
