import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { RedisService } from '@app/common/redis/redis.service';
import * as redisStore from 'cache-manager-redis-store';
import { env } from 'process';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, PrismaService, RedisService],
})
export class AuthModule {}
