import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { RabbitmqModule } from "../../rabbitmq/rabbitmq.module";
import { AuthorizationConsumer } from "../../../external/consumers/authorization-consumer";

@Module({
  imports:[HttpModule, RabbitmqModule],
  providers:[AuthorizationConsumer],
  exports:[AuthorizationConsumer],
})
export class AuthorizationConsumerModule {}
