import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { AuthorizationConsumer } from "../../../infrastructure/consumers/authorization-consumer";
import { RabbitmqModule } from "../../rabbitmq/rabbitmq.module";

@Module({
  imports:[HttpModule, RabbitmqModule],
  providers:[AuthorizationConsumer],
  exports:[AuthorizationConsumer],
})
export class AuthorizationConsumerModule {}
