import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../../@core/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createStore(@Body() createUserDto : CreateUserDto): Promise<void>{
    await this.userService.createUser(createUserDto);
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
