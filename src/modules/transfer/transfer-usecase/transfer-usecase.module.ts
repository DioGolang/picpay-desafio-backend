import { Module } from '@nestjs/common';
import { TransferFundsUseCase } from "../../../@core/use-cases/transfer.usecase";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
import { UserRepository } from "../../../infrastructure/database/user.repository";
import { StoreRepository } from "../../../infrastructure/database/store.repository";
import { HttpModule } from '@nestjs/axios';
import { TransferDomainService } from "../../../@core/services/transfer-domain/transfer-domain.service";
import { AuthorizationService } from "../../../infrastructure/external/authorization/authorization.service";
import { NotificationService } from "../../../infrastructure/external/notification/notification.service";
import { TransactionRepository } from "../../../infrastructure/database/transaction.repository";
import { UserUpdateStrategy } from "../../../@core/entities/strategies/user-update.strategy";
import { StoreUpdateStrategy } from "../../../@core/entities/strategies/store-update.strategy";

@Module({
  imports: [HttpModule],
  providers: [
    TransferFundsUseCase,
    PrismaService,
    UserRepository,
    StoreRepository,
    TransferDomainService,
    AuthorizationService,
    NotificationService,
    TransactionRepository,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IStoreRepository',
      useClass: StoreRepository,
    },
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
