import { Module } from '@nestjs/common';
import { TransferFundsUseCase } from "../../../@core/use-cases/transfer.usecase";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
import { UserRepository } from "../../../infrastructure/database/user.repository";
import { StoreRepository } from "../../../infrastructure/database/store.repository";
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    TransferFundsUseCase,
    PrismaService,
    UserRepository,
    StoreRepository,
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
