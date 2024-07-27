import { Store } from "../entities/store.entity";
import { IStoreRepository } from "../repositories/store.repository";
import { Inject, Injectable } from "@nestjs/common";
import { CreateStoreDto } from "../../modules/store/dto/create-store.dto";

@Injectable()
export class CreateStoreUsecase{
  constructor(@Inject('IStoreRepository') private readonly storeRepository: IStoreRepository) { }

  async execute(createStoreDto: CreateStoreDto){
    const {fullName, cnpj, email, password} = createStoreDto
    const store =  Store.create(fullName, cnpj, email, password);
    await this.storeRepository.save(store)
  }

}