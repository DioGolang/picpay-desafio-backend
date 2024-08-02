import { Module } from '@nestjs/common';
import { TransferController } from '../../controllers/transfer/transfer.controller';
import { HttpModule } from '@nestjs/axios';
import { TransferUsecaseModule } from "./transfer-usecase/transfer-usecase.module";
import { TransferService } from '../../../application/services/transfer/transfer.service';
import { PrismaService } from "../../database/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [HttpModule, TransferUsecaseModule],
  controllers: [TransferController],
  providers: [
    PrismaService,
    TransferService,
    JwtService,
  ],
  exports: [TransferService],
})
export class TransferModule {}
