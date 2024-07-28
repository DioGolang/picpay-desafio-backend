import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateStoreUsecase } from "../../@core/use-cases/create-store.usecase";
import { IStoreRepository } from "../../@core/repositories/store.repository";
import { Store } from "../../@core/entities/store.entity";
import { CreateStoreDto } from "./dto/create-store.dto";
import { IsUniqueConstraint } from "../../validators/is-unique.validator";
import { User } from "../../@core/entities/user.entity";


@Injectable()
export class StoreService {
  constructor(
    private readonly createStoreUseCase: CreateStoreUsecase,
    @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository
  ) { }

  async createStore(createStoreDto: CreateStoreDto):Promise<void>{
    await this.createStoreUseCase.execute(createStoreDto);
  }

  async findStoreById(id: string): Promise<Store | null>{
   return await this.storeRepository.findById(id)
  }

  async findStoreByEmail(email: string ): Promise<Store | null>{
    return await this.storeRepository.findByEmail(email);
  }

  async findStoreByOne(idOrEmail: string): Promise<Store | null>{
    return await this.storeRepository.findOne(idOrEmail);
  }

}
