import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../../../@core/interfaces/auth/jwt-payload.interface";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {


    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const payload : JwtPayload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
      req.user = payload;
      return true;
    } catch (error) {
      console.error('Error in JwtAuthGuard:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
