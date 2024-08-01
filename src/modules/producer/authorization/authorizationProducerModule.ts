import { Module } from '@nestjs/common';
import { RabbitmqModule } from "../../rabbitmq/rabbitmq.module";
import { AuthorizationService } from "../../../infrastructure/external/authorization/authorization.service";

@Module({
  imports:[RabbitmqModule],
  providers:[
    AuthorizationService,
    {
      provide: 'IAuthorization',
      useClass: AuthorizationService
    }
  ],
  exports:['IAuthorization'],
})
export class AuthorizationProducerModule {}
