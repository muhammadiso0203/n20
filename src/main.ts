import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Global, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = Number(process.env.PORT)
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
}
bootstrap();
