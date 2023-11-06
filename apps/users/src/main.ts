import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  await app.listen(3000); // process.env.PORT
  console.log(`User application listening on port 3000`);
}
bootstrap();
