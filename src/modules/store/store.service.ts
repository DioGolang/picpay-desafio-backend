import { Inject, Injectable } from "@nestjs/common";
import { CreateStoreUsecase } from "../../@core/use-cases/create-store.usecase";
import { IStoreRepository } from "../../@core/repositories/store.repository";
import { Store } from "../../@core/entities/store.entity";


@Injectable()
export class StoreService {
  constructor(
    private readonly createStoreUseCase: CreateStoreUsecase,
    @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository
  ) { }

  async createStore(fullName: string, cnpj: string, email: string, password: string):Promise<void>{
    await this.createStoreUseCase.execute(fullName, cnpj, email, password);
  }

  async findStoreById(id: string): Promise<Store | null>{
   return await this.storeRepository.findById(id)
  }

  async findStoreByEmail(email: string ): Promise<Store | null>{
    return await this.storeRepository.findByEmail(email);
  }

}
