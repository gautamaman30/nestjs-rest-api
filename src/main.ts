import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configObj } from './common/configEnv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configObj.PORT, () => console.log(`Application started at port: ${configObj.PORT}`));
}
bootstrap();
 