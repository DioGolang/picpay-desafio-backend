import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from '../../controllers/auth/auth.controller';
import { AuthService } from '../../../application/services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';
import { RepositoryModule } from '../repository/repository.module';
import { LoginUseCaseModule } from './login-usecase/login-usecase.module';
import { JwtStrategy } from "../../strategies/jwt.strategy";
import { JwtAuthGuard } from "../../../application/guards/auth/jwt-auth.guard";

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
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: ['IAuthService'],
})
export class AuthModule {}
