import { Module } from '@nestjs/common';
import { TransferUsecaseModule } from "./modules/transfer/transfer-usecase/transfer-usecase.module";
import { PrismaService } from "./infrastructure/database/prisma/prisma.service";
import { UserRepository } from "./infrastructure/database/user.repository";
import { StoreRepository } from "./infrastructure/database/store.repository";
import { AppController } from "./app.controller";
import { TransferController } from "./modules/transfer/transfer.controller";
import { UserController } from "./modules/user/user.controller";
import { StoreController } from "./modules/store/store.controller";
import { AppService } from "./app.service";
import { TransferService } from "./modules/transfer/transfer.service";
import { UserService } from "./modules/user/user.service";
import { CreateUserUsecase } from "./@core/use-cases/create-user.usecase";
import { StoreService } from "./modules/store/store.service";
import { CreateStoreUsecase } from "./@core/use-cases/create-store.usecase";

@Module({
  imports: [TransferUsecaseModule],
  controllers: [AppController, TransferController, UserController, StoreController],
  providers: [
    PrismaService,
    UserRepository,
    StoreRepository,
    AppService,
    TransferService,
    UserService,
    CreateUserUsecase,
    CreateStoreUsecase,
    StoreService,
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
export class AppModule {}