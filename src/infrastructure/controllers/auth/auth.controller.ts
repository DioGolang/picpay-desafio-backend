import { Body, Controller, Post, HttpException, HttpStatus } from "@nestjs/common";
import { LoginUseCase } from "../../../@core/use-cases/login.use-case";
import { LoginDto } from "../../../dto/auth/login.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{token:string}> {
    try {
      const token = await this.loginUseCase.execute(loginDto.email, loginDto.password);
      return { token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}