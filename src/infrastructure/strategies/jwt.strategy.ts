import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";
import * as process from "node:process";
import { JwtPayload } from "../../@core/interfaces/auth/jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    console.log('payload:', payload);
    return { email: payload.email, sub: payload.sub };
  }

}