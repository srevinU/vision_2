import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { env } from 'process';
// import { RolesGuard } from '@app/common/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  await app.listen(env.PORT);
  // app.useGlobalGuards(new RolesGuard());
  console.log(`${env.APP_NAME} application listening on port ${env.PORT}`);
}
bootstrap();
