import { env } from 'process';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
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

  private async generateToken(
    payload: object,
    secret: string,
  ): Promise<string> {
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

  private getExpirationDate(expirationTime: string): Date {
    const expires = new Date();
    const expiresDate = expires.setSeconds(
      expires.getSeconds() + Number(expirationTime),
    );
    return new Date(expiresDate);
  }

  private async saveRefreshToken(
    userAuth: UserAuthDto,
    refreshToken: string,
    expirationDate: Date,
  ): Promise<void> {
    const user = await this.prismaService.users.findUnique({
      where: { email: userAuth.email },
    });
    const token = await this.prismaService.tokens.findMany({
      where: { userId: user.id },
    });
    if (!token.length) {
      await this.prismaService.tokens.create({
        data: {
          userId: user.id,
          refreshToken: refreshToken,
          expiresAt: expirationDate,
        },
      });
    }
  }

  public async setCookies(
    response: Response,
    access_token: string,
    refresh_token?: string,
    userAuthDto?: UserAuthDto,
  ): Promise<Response> {
    const expirationJwtDate = this.getExpirationDate(env.JWT_EXPIRATION);
    const expirationJwtRefreshDate = this.getExpirationDate(
      env.JWT_REFRESH_EXPIRATION,
    );

    if (access_token) {
      response.cookie('access_token', access_token, {
        httpOnly: true,
        expires: expirationJwtDate,
      });
    }

    if (refresh_token) {
      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
      });
      await this.saveRefreshToken(
        userAuthDto,
        refresh_token,
        expirationJwtRefreshDate,
      );
    }
    return response;
  }

  private async clearRefreshToken(userId: string): Promise<void> {
    await this.prismaService.tokens.delete({ where: { userId: userId } });
  }

  private clearCookies(response: Response): void {
    response.cookie('access_token', '', { maxAge: -1 });
    response.cookie('refresh_token', '', { maxAge: -1 });
  }

  public logOut(response: Response, userId: string): Response {
    this.clearRefreshToken(userId);
    this.clearCookies(response);
    return response;
  }

  private extractTokenFromCookies(request: Request, tokenName: string): string {
    return request.cookies[tokenName];
  }

  private verifyToken(
    request: Request,
    tokenName: string,
    tokenSecret: string,
  ): void {
    const token = this.extractTokenFromCookies(request, tokenName);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      this.jwtService.verify(token, { secret: tokenSecret });
    } catch {
      throw new UnauthorizedException();
    }
  }

  private getPayload(token: string, tokenSecret: string): object {
    return this.jwtService.verify(token, { secret: tokenSecret });
  }

  public async refreshToken(request: Request): Promise<any> {
    this.verifyToken(request, 'refresh_token', env.REFRESH_JWT_SECRET);
    this.verifyToken(request, 'access_token', env.JWT_SECRET);
    const accessToken = this.extractTokenFromCookies(request, 'access_token');
    const payload = this.getPayload(accessToken, env.JWT_SECRET);
    const user = await this.isUserExisting(payload as CreateUserRegister);
    if (user) {
      const accessTokenRefreshed = await this.generateToken(
        payload,
        env.JWT_SECRET,
      );
      const refreshTokenRefreshed = await this.generateToken(
        payload,
        env.REFRESH_JWT_SECRET,
      );

      await this.clearRefreshToken(payload['sub']);
      await this.saveRefreshToken(
        user as UserAuthDto,
        refreshTokenRefreshed,
        this.getExpirationDate(env.JWT_REFRESH_EXPIRATION),
      );
      return {
        access_token: accessTokenRefreshed,
        refresh_token: refreshTokenRefreshed,
        user: user,
      };
    }
    throw new UnauthorizedException();
  }
}
