import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserAuthDto } from './dto/user-auth.dto';
import { CreateUserRegister } from './dto/create-user-register';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  private async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(
      password,
      parseInt(this.configService.get('SALT')),
    );
  }

  private async isUserExisting(
    user: CreateUserRegister,
  ): Promise<CreateUserRegister | null> {
    return await this.prismaService.user.findUnique({
      where: { email: user.email },
    });
  }

  public async register(user: CreateUserRegister): Promise<CreateUserRegister> {
    if ((await this.isUserExisting(user)) != null) {
      throw new UnauthorizedException();
    }
    user.password = await this.generateHash(user.password);
    return await this.prismaService.user.create({ data: user });
  }

  public async login(user: UserAuthDto): Promise<any> {
    const currentUser = await this.prismaService.user.findUnique({
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

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });

    return { access_token: accessToken };
  }

  public getExpire(): Date {
    const expires = new Date();
    const expiresDate = expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    return new Date(expiresDate);
  }
}
