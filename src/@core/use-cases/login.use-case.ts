import { Inject, Injectable } from "@nestjs/common";
import { IAuthService } from "../interfaces/auth/auth.interface";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) { }

  async execute(email: string, password: string): Promise<string> {
    const user = await this.authService.validate(email, password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return this.authService.generateToken(user);
  }
}