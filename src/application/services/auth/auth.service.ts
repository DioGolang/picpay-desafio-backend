import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../../@core/entities/user.entity";
import { Store } from "../../../@core/entities/store.entity";
import { IAuthService } from "../../../@core/interfaces/auth/auth.interface";
import { FindByEmailStrategy } from "../../../@core/entities/strategies/find-by-email/find-by-email.strategy";
import { JwtPayload } from "../../../@core/interfaces/auth/jwt-payload.interface";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('UserFindByEmailStrategy') private readonly userFindByEmailStrategy: FindByEmailStrategy<User>,
    @Inject('StoreFindByEmailStrategy') private readonly storeFindByEmailStrategy: FindByEmailStrategy<Store>,
    private readonly jwtService: JwtService,
  ) {}

  private async getFindByEmailStrategy(email: string): Promise<User | Store | null> {
    try {
      const user = await this.userFindByEmailStrategy.findByEmail(email);
      if (user) return user;

      const store = await this.storeFindByEmailStrategy.findByEmail(email);
      return store || null;
    } catch (error) {
      console.error('Error in getFindByEmailStrategy:', error);
      throw new HttpException('Error finding user or store by email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validate(email: string, password: string): Promise<User | Store | null> {
    try {
      const user = await this.getFindByEmailStrategy(email);
      if (user && await user.verifyPassword(password)) {
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error in validate:', error);
      throw new HttpException('Error validating user or store', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  generateToken(user: User | Store): string {
    try {
      if (!user) {
        throw new HttpException('User or Store not found', HttpStatus.BAD_REQUEST);
      }
      const payload: JwtPayload = { email: user.email, sub: user.id };
      return this.jwtService.sign(payload);
    } catch (error) {
      console.error('Error in generateToken:', error);
      throw new HttpException('Error generating token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}