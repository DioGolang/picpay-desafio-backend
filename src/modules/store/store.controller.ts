import { Body, Controller, Get, Param, Post, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { StoreService } from "./store.service";
import { Store } from "../../@core/entities/store.entity";
import { CreateStoreDto } from "./dto/create-store.dto";
import { HttpExceptionFilter } from "../../common/filters/http-exception/http-exception.filter";

@Controller('store')
@UseFilters(new HttpExceptionFilter())
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  @UsePipes(new ValidationPipe({transform:true}))
  async createStore(@Body() createStoreDto: CreateStoreDto): Promise<{ message: string }>{
    await this.storeService.createStore(createStoreDto);
    return { message: 'Store created successfully' };
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({transform:true}))
  async getUserById(@Param('id') id: string): Promise<Store | null> {
    return await this.storeService.findStoreById(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<Store | null> {
    return await this.storeService.findStoreByEmail(email);
  }

}
