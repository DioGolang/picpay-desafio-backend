import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./common/filters/http-exception/http-exception.filter";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`],
  //     queue: process.env.RABBITMQ_QUEUE,
  //     queueOptions: { durable: true },
  //   },
  // });

  // await app.startAllMicroservices();


  await app.listen(3000);
}
bootstrap();
