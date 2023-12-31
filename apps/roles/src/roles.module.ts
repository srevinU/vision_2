import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { JwtStrategy } from '@app/common/strategies/jwt.strategy';
import { RoleStrategy } from '@app/common/strategies/role.strategy';

@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaService, JwtStrategy, RoleStrategy],
})
export class RolesModule {}
