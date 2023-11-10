import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InterfaceEnv } from './common/interfaces/env.interface';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  const config = app.get(ConfigService<InterfaceEnv>)
  await app.listen(config.get('PORT'));
}
bootstrap();
