import {
  Body,
  Controller,
  Get,
  HttpException, HttpStatus,
  Param,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { UserService } from "../../../application/services/user/user.service";
import { CreateUserDto } from "../../../dto/user/create-user.dto";
import { HttpExceptionFilter } from "../../../common/filters/http-exception/http-exception.filter";
import { User } from "../../../@core/entities/user.entity";

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UsePipes(new ValidationPipe({transform:true}))
  async createStore(@Body() createUserDto : CreateUserDto): Promise<{ message: string }>{
    try {
      await this.userService.createUser(createUserDto);
      return { message: 'User created successfully' };
    }catch (error){
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({transform:true}))
  async getUserById(@Param('id') id: string): Promise<User | null> {
    try {
      return await this.userService.findUserById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User | null> {
    try {
      return await this.userService.findUserByEmail(email);
    }catch (error){
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

}
