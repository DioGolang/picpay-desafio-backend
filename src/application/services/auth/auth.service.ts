import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../../@core/entities/user.entity";
import { Store } from "../../../@core/entities/store.entity";
import { IAuthService } from "../../../@core/interfaces/auth/auth.interface";
import { FindByEmailStrategy } from "../../../@core/entities/strategies/find-by-email/find-by-email.strategy";

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
      if (user) {
        return user;
      }
      const store = await this.storeFindByEmailStrategy.findByEmail(email);
      return store || null;
    } catch (error) {
      console.error('Error in getFindByEmailStrategy:', error);
      throw new Error('Error finding user or store by email');
    }
  }

  async validate(email: string, password: string): Promise<User | Store | null> {
    try {
      const user = await this.getFindByEmailStrategy(email);
      if (user && user.verifyPassword(password)) {
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error in validate:', error);
      throw new Error('Error validating user or store');
    }
  }

  generateToken(user: User | Store): string {
    try {
      if (!user) {
        throw new Error('User or Store not found');
      }
      const payload = { email: user.email, sub: user.id };
      return this.jwtService.sign(payload);
    } catch (error) {
      console.error('Error in generateToken:', error);
      throw new Error('Error generating token');
    }
  }
}