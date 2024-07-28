import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { HttpModule } from '@nestjs/axios';
import { TransferUsecaseModule } from "./transfer-usecase/transfer-usecase.module";
import { UserRepository } from "../../infrastructure/database/user.repository";
import { StoreRepository } from "../../infrastructure/database/store.repository";
import { PrismaService } from "../../infrastructure/database/prisma/prisma.service";
import { TransferService } from './transfer.service';

@Module({
  imports: [HttpModule, TransferUsecaseModule],
  controllers: [TransferController],
  providers: [
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
    TransferService,
  ],
})
export class TransferModule {}
