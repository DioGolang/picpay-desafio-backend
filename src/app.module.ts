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

@Module({
  imports: [
    PrismaModule,
    StoreModule,
    UserModule
  ],
  controllers: [AppController, TransferController, UserController, StoreController],
  providers: [
    AppService,
    PrismaService,
    TransferService,
  ],
})
export class AppModule {}
