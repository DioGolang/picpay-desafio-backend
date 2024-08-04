import { Store } from "../entities/store.entity";
import { IStoreRepository } from "../repositories/store.repository";
import { Inject, Injectable } from "@nestjs/common";
import { CreateStoreDto } from "../../dto/store/create-store.dto";
import { IHasher } from "../interfaces/hasher.interface";

@Injectable()
export class CreateStoreUsecase{
  constructor(
    @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository,
    @Inject('IHasher') private readonly hasher: IHasher
  ) { }

  async execute(createStoreDto: CreateStoreDto): Promise<void>{
    const {fullName, cnpj, email, password} = createStoreDto
    const store = await Store.create(fullName, cnpj, email, password, this.hasher);
    await this.storeRepository.save(store)
  }

}