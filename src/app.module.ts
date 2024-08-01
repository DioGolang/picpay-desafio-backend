import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { StoreRepository } from './infrastructure/database/store.repository';
import { AppController } from './app.controller';
import { TransferController } from './modules/transfer/transfer.controller';
import { UserController } from './modules/user/user.controller';
import { StoreController } from './modules/store/store.controller';
import { AppService } from './app.service';
import { IsUniqueConstraint } from './validators/is-unique.validator';
import { StoreModule } from './modules/store/store.module';
import { HttpModule } from '@nestjs/axios';
import { RabbitmqModule } from './modules/rabbitmq/rabbitmq.module';
import { AuthorizationConsumerModule } from './modules/consumers/authorization/authorizationConsumerModule';
import { AuthorizationProducerModule } from './modules/producer/authorization/authorizationProducerModule';
import { NotificationProducerModule } from './modules/producer/notification/notificationProducerModule';
import { NotificationConsumerModule } from './modules/consumers/notification/notificationConsumerModule';
import { TransferModule } from "./modules/transfer/transfer.module";
import { UserModule } from "./modules/user/user.module";
import { RepositoryModule } from './modules/repository/repository.module';

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
  ],
  controllers: [AppController, TransferController, UserController, StoreController],
  providers: [
    PrismaService,
    {
      provide: 'IRepository<Store>',
      useClass: StoreRepository,
    },
    IsUniqueConstraint,
    AppService,
  ],
})
export class AppModule {}
