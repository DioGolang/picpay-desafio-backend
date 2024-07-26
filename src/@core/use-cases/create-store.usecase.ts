import { Store } from "../entities/store.entity";
import { IStoreRepository } from "../repositories/store.repository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CreateStoreUsecase{
  constructor(@Inject('IStoreRepository') private readonly storeRepository: IStoreRepository) { }

  async execute(fullName: string, cnpj: string, email: string, password: string){
    const store =  Store.create(fullName, cnpj, email, password);
    await this.storeRepository.save(store)
  }

}