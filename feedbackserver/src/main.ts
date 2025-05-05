/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as fs from 'fs';


async function bootstrap() {

/*
  const httpsOptions = {
    key: fs.readFileSync('./secrets/key.pem'),
    cert: fs.readFileSync('./secrets/cert.pem'),
  };  */

  const app = await NestFactory.create(AppModule,{
  /*  httpsOptions, */
  });


  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://eservices.dgw.gov.ae',
      'http://eservices.dgw.gov.ae' // For testing
    ],
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-http-method-override'],
    exposedHeaders: ['X-Powered-By'],
    credentials: true
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
