import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { StoreRepository } from './infrastructure/database/store.repository';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IsUniqueConstraint } from './common/validators/is-unique.validator';
import { HttpModule } from '@nestjs/axios';
import { TransferModule } from "./infrastructure/modules/transfer/transfer.module";
import { StoreModule } from "./infrastructure/modules/store/store.module";
import { UserModule } from "./infrastructure/modules/user/user.module";
import { RepositoryModule } from "./infrastructure/modules/repository/repository.module";
import { RabbitmqModule } from "./infrastructure/modules/rabbitmq/rabbitmq.module";
import {
  AuthorizationProducerModule
} from "./infrastructure/modules/producer/authorization/authorizationProducerModule";
import {
  AuthorizationConsumerModule
} from "./infrastructure/modules/consumers/authorization/authorizationConsumerModule";
import { NotificationProducerModule } from "./infrastructure/modules/producer/notification/notificationProducerModule";
import { NotificationConsumerModule } from "./infrastructure/modules/consumers/notification/notificationConsumerModule";
import { TransferController } from "./infrastructure/controllers/transfer/transfer.controller";
import { UserController } from "./infrastructure/controllers/user/user.controller";
import { StoreController } from "./infrastructure/controllers/store/store.controller";
import { AuthController } from "./infrastructure/controllers/auth/auth.controller";
import { LoginUseCaseModule } from "./infrastructure/modules/auth/login-usecase/login-usecase.module";
import { AuthModule } from "./infrastructure/modules/auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { HasherModule } from "./infrastructure/modules/hasher/hasher.module";

@Module({
  imports: [
    TransferModule,
    StoreModule,
    UserModule,
    RepositoryModule,
    HttpModule,
    RabbitmqModule,
    AuthorizationProducerModule,
    AuthorizationConsumerModule,
    NotificationProducerModule,
    NotificationConsumerModule,
    AuthModule,
    LoginUseCaseModule,
    HasherModule,
  ],
  controllers: [AppController, TransferController, UserController, StoreController, AuthController],
  providers: [
    PrismaService,
    {
      provide: 'IRepository<Store>',
      useClass: StoreRepository,
    },
    IsUniqueConstraint,
    AppService,
    JwtService
  ],
})
export class AppModule {}