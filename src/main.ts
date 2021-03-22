import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configObj } from './common/configEnv';
import { TransformInterceptor } from "./common/interceptors/index";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(configObj.PORT, () => console.log(`Application started at port: ${configObj.PORT}`));
}
bootstrap();
 