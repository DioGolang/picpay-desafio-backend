import { Module } from '@nestjs/common';
import { TransferFundsUseCase } from "../../../@core/use-cases/transfer.usecase";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
import { HttpModule } from "@nestjs/axios";
import { TransferDomainService } from "../../../@core/services/transfer-domain/transfer-domain.service";
import { TransactionRepository } from "../../../infrastructure/database/transaction.repository";
import { UserUpdateStrategy } from "../../../@core/entities/strategies/user-update.strategy";
import { StoreUpdateStrategy } from "../../../@core/entities/strategies/store-update.strategy";
import { RabbitmqModule } from "../../rabbitmq/rabbitmq.module";
import { NotificationProducerModule } from "../../producer/notification/notificationProducerModule";
import { AuthorizationProducerModule } from "../../producer/authorization/authorizationProducerModule";
import { RepositoryModule } from "../../repository/repository.module";

@Module({
  imports: [
    RabbitmqModule,
    HttpModule,
    AuthorizationProducerModule,
    NotificationProducerModule,
    RepositoryModule,
  ],
  providers: [
    TransferFundsUseCase,
    PrismaService,
    TransferDomainService,
    TransactionRepository,
    {
      provide: 'UserUpdateStrategy',
      useClass: UserUpdateStrategy,
    },
    {
      provide: 'StoreUpdateStrategy',
      useClass: StoreUpdateStrategy,
    },
  ],
  exports: [TransferFundsUseCase],
})
export class TransferUsecaseModule {}
