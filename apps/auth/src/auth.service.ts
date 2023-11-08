import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/src/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: CreateAuthDto): Promise<any> {
    const currentUser = await this.usersService.findOne(user.email);

    if (currentUser?.password !== user.password) {
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

  getExpire(): Date {
    const expires = new Date();
    const date = expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    return new Date(date);
  }
}
