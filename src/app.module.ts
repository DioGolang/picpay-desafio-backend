import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { TransferService } from './@core/services/transfer/transfer.service';
import { TransferController } from './modules/transfer/transfer.controller';
import { UserController } from './modules/user/user.controller';
import { StoreController } from './modules/store/store.controller';
import { StoreModule } from './modules/store/store.module';
import { UserModule } from './modules/user/user.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { HttpModule } from "@nestjs/axios";
import { TransferUsecaseModule } from "./modules/transfer/transfer-usecase/transfer-usecase.module";


@Module({
  imports: [
    PrismaModule,
    StoreModule,
    UserModule,
    TransferModule,
    HttpModule,
    TransferUsecaseModule,
  ],
  controllers: [AppController, TransferController, UserController, StoreController],
  providers: [
    AppService,
    PrismaService,
    TransferService,
  ],
})
export class AppModule {}
