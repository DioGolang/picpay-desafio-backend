import { Module } from '@nestjs/common';
import { TransferController } from '../../controllers/transfer/transfer.controller';
import { HttpModule } from '@nestjs/axios';
import { TransferUsecaseModule } from "./transfer-usecase/transfer-usecase.module";
import { TransferService } from '../../../application/services/transfer/transfer.service';
import { PrismaService } from "../../database/prisma/prisma.service";

@Module({
  imports: [HttpModule, TransferUsecaseModule],
  controllers: [TransferController],
  providers: [
    PrismaService,
    TransferService,
  ],
  exports: [TransferService],
})
export class TransferModule {}
