import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(env.PORT);
  console.log(`Auth application listening on port ${env.PORT}`);
}
bootstrap();
