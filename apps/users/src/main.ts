import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  await app.listen(env.PORT);
  console.log(`User application listening on port ${env.PORT}`);
}
bootstrap();
