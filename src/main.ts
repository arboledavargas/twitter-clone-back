import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { auth } from 'express-oauth2-jwt-bearer';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  const config = app.get(ConfigService)

  const jwtCheck = auth({
    audience: config.get('AUTH_AUDIENCE'),
    issuerBaseURL: config.get('AUTH_ISSUER_BASEURL'),
    tokenSigningAlg: 'RS256'
  });

  app.use(jwtCheck);

  await app.listen(8080);

  console.log('Server is running on port 8080');
}

bootstrap();