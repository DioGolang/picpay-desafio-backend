import { Module } from '@nestjs/common';
import { PrismaService } from "../../database/prisma/prisma.service";
import { UserRepository } from "../../database/user.repository";
import { StoreRepository } from "../../database/store.repository";

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
    {
      provide: 'UserFindByEmailStrategy',
      useClass: UserRepository,
    },
    {
      provide: 'StoreFindByEmailStrategy',
      useClass: StoreRepository,
    },
  ],
  exports: ['IUserRepository', 'IStoreRepository', 'UserFindByEmailStrategy', 'StoreFindByEmailStrategy'],
})
export class RepositoryModule {}