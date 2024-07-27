// repository.module.ts
import { Module } from '@nestjs/common';
import { UserRepository } from "../../infrastructure/database/user.repository";
import { PrismaService } from "../../infrastructure/database/prisma/prisma.service";
import { StoreRepository } from "../../infrastructure/database/store.repository";

@Module({
  providers: [
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
  exports: ['IUserRepository', 'IStoreRepository'],
})
export class RepositoryModule {}