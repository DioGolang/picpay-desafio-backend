import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from '../../controllers/auth/auth.controller';
import { AuthService } from '../../../application/services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';
import { RepositoryModule } from '../repository/repository.module';
import { LoginUseCaseModule } from './login-usecase/login-usecase.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register(jwtConfig),
    RepositoryModule,
    forwardRef(() => LoginUseCaseModule),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
  ],
  exports: ['IAuthService'],
})
export class AuthModule {}
