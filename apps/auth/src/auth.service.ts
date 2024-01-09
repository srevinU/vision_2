import { env } from 'process';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from './dto/user-auth.dto';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { RedisService } from '@app/common/redis/redis.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserRegister } from './dto/create-user-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
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

  private async generateToken(
    payload: object,
    secret: string,
  ): Promise<string> {
    payload['date'] = new Date();
    return await this.jwtService.signAsync(payload, { secret: secret });
  }

  public async login(user: UserAuthDto): Promise<any> {
    if (!user.email || !user.password) {
      throw new UnauthorizedException();
    }

    const currentUser = await this.prismaService.users.findUnique({
      where: { email: user.email },
    });

    if (!currentUser) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      currentUser.password,
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

    const tokens = { access_token: accessToken, refresh_token: refreshToken };

    this.redisService.add(currentUser.email, tokens);

    return tokens;
  }

  private getExpirationDate(expirationTime: string): Date {
    const expires = new Date();
    const expiresDate = expires.setSeconds(
      expires.getSeconds() + Number(expirationTime),
    );
    return new Date(expiresDate);
  }

  public async setCookies(
    response: Response,
    accessToken: string,
    refreshToken?: string,
  ): Promise<Response> {
    const expirationJwtDate = this.getExpirationDate(env.JWT_EXPIRATION);
    const expirationJwtRefreshDate = this.getExpirationDate(
      env.JWT_REFRESH_EXPIRATION,
    );

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      expires: expirationJwtDate,
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      expires: expirationJwtRefreshDate,
    });

    return response;
  }

  private clearCookies(response: Response): void {
    response.cookie('access_token', '', { maxAge: -1 });
    response.cookie('refresh_token', '', { maxAge: -1 });
  }

  public logOut(response: Response, userEmail: string): Response {
    this.clearCookies(response);
    this.redisService.delete(userEmail);
    return response;
  }

  private extractTokenFromCookies(request: Request, tokenName: string): string {
    return request.cookies[tokenName];
  }

  private async verifyToken(
    request: Request,
    tokenName: string,
    tokenSecret: string,
    email: string,
  ): Promise<void> {
    const token = this.extractTokenFromCookies(request, tokenName);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      this.jwtService.verify(token, { secret: tokenSecret });
      if (tokenName === 'refresh_token') {
        const tokens = await this.redisService.get(email);
        const refreshToken = tokens['refresh_token'];
        if (!refreshToken) throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
  }

  private getPayload(token: string, tokenSecret: string): object {
    return this.jwtService.verify(token, { secret: tokenSecret });
  }

  public async refreshTokens(request: Request): Promise<any> {
    const accessToken = this.extractTokenFromCookies(request, 'access_token');
    const payload = this.getPayload(accessToken, env.JWT_SECRET);
    const user = await this.isUserExisting(payload as CreateUserRegister);

    if (user) {
      await this.verifyToken(
        request,
        'refresh_token',
        env.REFRESH_JWT_SECRET,
        user.email,
      );

      await this.verifyToken(
        request,
        'access_token',
        env.JWT_SECRET,
        user.email,
      );

      const accessTokenRefreshed = await this.generateToken(
        payload,
        env.JWT_SECRET,
      );

      const refreshTokenRefreshed = await this.generateToken(
        payload,
        env.REFRESH_JWT_SECRET,
      );

      const tokensRefreshed = {
        access_token: accessTokenRefreshed,
        refresh_token: refreshTokenRefreshed,
      };

      this.redisService.delete(user.email);
      this.redisService.add(user.email, tokensRefreshed);

      return tokensRefreshed;
    }
    throw new UnauthorizedException();
  }
}
