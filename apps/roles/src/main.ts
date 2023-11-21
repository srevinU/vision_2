import { NestFactory } from '@nestjs/core';
import { RolesModule } from './roles.module';
import { env } from 'process';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(RolesModule);
  app.use(cookieParser());
  await app.listen(env.PORT);
  console.log(`${env.APP_NAME} application listening on port ${env.PORT}`);
}
bootstrap();
