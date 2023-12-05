import { env } from 'process';
import { Tuser } from '../types/user';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleStrategy extends PassportStrategy(Strategy, 'role') {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request?.cookies['access_token'],
      ]),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate({ sub }: Tuser) {
    return await this.prismaService.roles.findMany({
      where: { userId: sub, name: 'admin' },
    });
  }
}
