import { Global, Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqService } from '../../infrastructure/external/rabbitmq/rabbitmq.service';
import * as process from 'node:process';
import { HttpModule } from '@nestjs/axios';
import { AuthorizationService } from "../../infrastructure/external/authorization/authorization.service";
import { AuthorizationConsumer } from "../../infrastructure/consumers/authorization-consumer";

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
