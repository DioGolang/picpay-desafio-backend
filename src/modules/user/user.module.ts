import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserUsecaseModule } from './user.usecase/user.usecase.module';


@Module({
  imports: [UserUsecaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]

})
export class UserModule {}