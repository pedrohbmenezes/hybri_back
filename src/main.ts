import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3001 || process.env.PORT
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port, ()=>console.log(`Rodando na porta ${port}`));
}
bootstrap();
