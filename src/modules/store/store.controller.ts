import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { StoreService } from "./store.service";
import { Store } from "../../@core/entities/store.entity";

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  async createStore(@Body(){ fullName, cnpj, email, password } : { fullName: string, cnpj : string, email: string, password:string}): Promise<void>{
    await this.storeService.createStore(fullName, cnpj, email, password);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Store | null> {
    return await this.storeService.findStoreById(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<Store | null> {
    return await this.storeService.findStoreByEmail(email);
  }

}
