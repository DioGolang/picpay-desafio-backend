import { Module } from '@nestjs/common';
import { CreateStoreUsecase } from "../../../@core/use-cases/create-store.usecase";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
import { StoreRepository } from "../../../infrastructure/database/store.repository";

@Module({
  providers:[
    CreateStoreUsecase,
    PrismaService,
    {
      provide: 'IStoreRepository',
      useClass: StoreRepository,
    },
  ],
  exports:[CreateStoreUsecase, 'IStoreRepository']
})
export class StoreUsecaseModule {}
