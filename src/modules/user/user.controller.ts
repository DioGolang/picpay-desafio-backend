import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../../@core/entities/user.entity";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createStore(@Body(){ fullName, cpf, email, password } : { fullName: string, cpf : string, email: string, password:string}): Promise<void>{
    await this.userService.createUser(fullName, cpf, email, password);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return await this.userService.findUserById(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User | null> {
    return await this.userService.findStoreByEmail(email);
  }

}
