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
    const userExisting = await this.isUserExisting(user);
    if (userExisting) throw new UnauthorizedException();
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

  public async login(user: UserAuthDto, response: Response): Promise<void> {
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

    const jwt = await this.generateToken(payload, env.JWT_SECRET);
    this.redisService.add(currentUser.email, jwt);

    this.setCookie(response, jwt);
  }

  private getExpirationDate(expirationTime: string): Date {
    const expires = new Date();
    const expiresDate = expires.setSeconds(
      expires.getSeconds() + Number(expirationTime),
    );
    return new Date(expiresDate);
  }

  public async setCookie(
    response: Response,
    accessToken: string,
  ): Promise<Response> {
    const expirationJwtDate = this.getExpirationDate(env.JWT_EXPIRATION);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      expires: expirationJwtDate,
    });

    return response;
  }

  private clearCookies(response: Response): void {
    response.cookie('Authentication', '', { maxAge: -1 });
  }

  public logOut(response: Response, userEmail: string): void {
    this.clearCookies(response);
    this.redisService.delete(userEmail);
  }

  private extractTokenFromCookies(request: Request, tokenName: string): string {
    return request.cookies[tokenName];
  }

  private async verifyToken(
    request: Request,
    tokenName: string,
    tokenSecret: string,
  ): Promise<void> {
    const token = this.extractTokenFromCookies(request, tokenName);
    if (!token) throw new UnauthorizedException();

    try {
      this.jwtService.verify(token, { secret: tokenSecret });
    } catch {
      throw new UnauthorizedException();
    }
  }

  private getPayload(token: string, tokenSecret: string): object {
    return this.jwtService.verify(token, { secret: tokenSecret });
  }

  public async refreshTokens(
    request: Request,
    response: Response,
  ): Promise<void> {
    let jwt = this.extractTokenFromCookies(request, 'Authentication');
    if (!jwt) throw new UnauthorizedException();
    const payload = this.getPayload(jwt, env.JWT_SECRET);
    const user = await this.isUserExisting(payload as CreateUserRegister);
    if (!user) throw new UnauthorizedException();
    await this.verifyToken(request, 'Authentication', env.JWT_SECRET);
    jwt = await this.generateToken(payload, env.JWT_SECRET);
    this.redisService.delete(user.email);
    this.setCookie(response, jwt);
  }
}
