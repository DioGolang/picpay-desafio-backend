import { JwtModuleOptions } from "@nestjs/jwt";
import * as process from "node:process";

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'secret',
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
}