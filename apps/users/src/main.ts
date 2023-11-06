import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  await app.listen(process.env.PORT);
  console.log(`User application listening on port ${process.env.PORT}`);
}
bootstrap();
