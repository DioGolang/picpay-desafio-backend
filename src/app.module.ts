import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { TransferService } from './@core/services/transfer/transfer.service';
import { TransferController } from './modules/transfer/transfer.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, TransferController],
  providers: [
    AppService,
    PrismaService,
    TransferService
  ],
})
export class AppModule {}
