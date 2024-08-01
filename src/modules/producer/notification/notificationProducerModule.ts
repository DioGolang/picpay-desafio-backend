import { Module } from '@nestjs/common';
import { RabbitmqModule } from "../../rabbitmq/rabbitmq.module";
import {
  RabbitmqNotificationService
} from "../../../infrastructure/external/notification/rabbitmq-notification/rabbitmq-notification.service";

@Module({
  imports: [RabbitmqModule],
  providers:[
    RabbitmqNotificationService,
    {
      provide: 'INotification',
      useClass: RabbitmqNotificationService,
    }
  ],
  exports: ['INotification'],
})
export class NotificationProducerModule {}
