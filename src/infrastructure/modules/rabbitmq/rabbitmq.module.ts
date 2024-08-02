import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import * as process from 'node:process';
import { HttpModule } from '@nestjs/axios';
import { RabbitmqService } from "../../external/rabbitmq/rabbitmq.service";
import { AuthorizationService } from "../../external/producer/authorization/authorization.service";
import { AuthorizationConsumer } from "../../external/consumers/authorization-consumer";


@Global()
@Module({
  imports: [
    HttpModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'authorization_exchange',
          type: 'direct',
        },
        {
          name: 'notification_exchange',
          type: 'direct',
        },
      ],
      uri: `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`,
    }),
  ],
  providers: [
    RabbitmqService,
    AuthorizationService,
    AuthorizationConsumer,
    {
      provide: 'IMessageBroker',
      useClass: RabbitmqService,
    },
    {
      provide: 'IAuthorization',
      useClass: AuthorizationService,
    },
  ],
  exports: ['IMessageBroker', RabbitMQModule, 'IAuthorization'],
})
export class RabbitmqModule {}
