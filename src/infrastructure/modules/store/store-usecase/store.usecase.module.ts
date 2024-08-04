import { Module } from '@nestjs/common';
import { CreateStoreUsecase } from "../../../../@core/use-cases/create-store.usecase";
import { PrismaService } from "../../../database/prisma/prisma.service";
import { StoreRepository } from "../../../database/store.repository";
import { HasherModule } from "../../hasher/hasher.module";

@Module({
  imports:[
    HasherModule,
  ],
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
