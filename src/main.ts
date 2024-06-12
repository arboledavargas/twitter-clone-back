import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { auth } from 'express-oauth2-jwt-bearer';
import { ConfigService } from "@nestjs/config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService)

  const jwtCheck = auth({
    audience: config.get('AUTH_AUDIENCE'),//'http://twitter-clone.com',
    issuerBaseURL: config.get('AUTH_ISSUER_BASEURL'),//'https://dev-dcr1tflkwnijlpv7.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

  app.use(jwtCheck);

  await app.listen(3000);
}

bootstrap();