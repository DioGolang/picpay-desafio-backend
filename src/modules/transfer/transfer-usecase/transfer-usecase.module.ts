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
  ],
  exports: [TransferFundsUseCase],
})
export class TransferUsecaseModule {}