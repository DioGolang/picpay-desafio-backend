import { Module, forwardRef } from '@nestjs/common';
import { LoginUseCase } from '../../../../@core/use-cases/login.use-case';
import { AuthModule } from '../auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
  ],
  providers: [LoginUseCase],
  exports: [LoginUseCase],
})
export class LoginUseCaseModule {}
