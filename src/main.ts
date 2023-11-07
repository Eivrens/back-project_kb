import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const port: number = 3333;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
main();
