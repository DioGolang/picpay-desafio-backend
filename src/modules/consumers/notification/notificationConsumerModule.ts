import { Module } from '@nestjs/common';
import { NotificationConsumer } from "../../../infrastructure/consumers/notification-consumer";
import { HttpModule } from "@nestjs/axios";
import { RabbitmqModule } from "../../rabbitmq/rabbitmq.module";

@Module({
  imports:[HttpModule, RabbitmqModule],
  providers: [NotificationConsumer],
  exports:[NotificationConsumer],
})
export class NotificationConsumerModule {}
