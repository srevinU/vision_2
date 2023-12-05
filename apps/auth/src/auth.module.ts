import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '@app/common/prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, PrismaService],
})
export class AuthModule {}
