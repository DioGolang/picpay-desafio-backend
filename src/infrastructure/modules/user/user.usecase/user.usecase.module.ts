import { Module } from '@nestjs/common';
import { CreateUserUsecase } from "../../../../@core/use-cases/create-user.usecase";
import { UserRepository } from "../../../database/user.repository";
import { PrismaService } from "../../../database/prisma/prisma.service";


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
