import { Module } from '@nestjs/common';
import { CreateUserUsecase } from "../../../@core/use-cases/create-user.usecase";
import { PrismaService } from "../../../infrastructure/database/prisma/prisma.service";
import { UserRepository } from "../../../infrastructure/database/user.repository";

@Module({
  providers: [
    CreateUserUsecase,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [CreateUserUsecase, 'IUserRepository'],
})
export class UserUsecaseModule {}
