import { Store } from "../entities/store.entity";
import { IStoreRepository } from "../repositories/store.repository";
import { Inject, Injectable } from "@nestjs/common";
import { CreateStoreDto } from "../../dto/store/create-store.dto";
import { IHasher } from "../interfaces/hasher.interface";
import { GenericFactory } from "../factories/generic-factory";

@Injectable()
export class CreateStoreUsecase{
  constructor(
    @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository,
    @Inject(GenericFactory) private readonly genericFactory: GenericFactory,
    @Inject('IHasher') private readonly hasher: IHasher
  ) { }

  async execute(createStoreDto: CreateStoreDto): Promise<void>{
    const {fullName, cnpj, email, password} = createStoreDto;
    const store = await this.genericFactory.create('store', {
      id: null,
      fullName,
      cnpj,
      email,
      password,
      hasher: this.hasher
    }) as Store;
    await this.storeRepository.save(store)
  }

}