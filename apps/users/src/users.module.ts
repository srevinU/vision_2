import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '@app/common/strategies/jwt.strategy';
import { RoleStrategy } from '@app/common/strategies/role.strategy';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtStrategy, RoleStrategy],
})
export class UsersModule {}
