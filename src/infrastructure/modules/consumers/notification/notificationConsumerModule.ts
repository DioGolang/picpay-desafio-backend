import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { RabbitmqModule } from "../../rabbitmq/rabbitmq.module";
import { NotificationConsumer } from "../../../external/consumers/notification-consumer";

@Module({
  imports:[HttpModule, RabbitmqModule],
  providers: [NotificationConsumer],
  exports:[NotificationConsumer],
})
export class NotificationConsumerModule {}
