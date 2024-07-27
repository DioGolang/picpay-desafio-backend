import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { HttpModule } from '@nestjs/axios';
import { TransferUsecaseModule } from "./transfer-usecase/transfer-usecase.module";
import { TransferService } from "../../@core/services/transfer/transfer.service";
import { UserRepository } from "../../infrastructure/database/user.repository";
import { StoreRepository } from "../../infrastructure/database/store.repository";
import { PrismaService } from "../../infrastructure/database/prisma/prisma.service";

@Module({
  imports: [HttpModule, TransferUsecaseModule],
  controllers: [TransferController],
  providers: [
    TransferService,
    UserRepository,
    StoreRepository,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IStoreRepository',
      useClass: StoreRepository,
    },
  ],
})
export class TransferModule {}
