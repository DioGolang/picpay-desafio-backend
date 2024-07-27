import { Body, Controller, Get, Param, Post, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../../@core/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { HttpExceptionFilter } from "../../filters/http-exception/http-exception.filter";

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(new ValidationPipe({transform:true}))
  async createStore(@Body() createUserDto : CreateUserDto): Promise<{ message: string }>{
    await this.userService.createUser(createUserDto);
    return { message: 'User created successfully' };
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
