import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'apps/users/src/users.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@app/common/prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    UsersService,
    ConfigService,
    PrismaService,
  ],
})
export class AuthModule {}
