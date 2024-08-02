import { FindByEmailStrategy } from "./find-by-email.strategy";
import { Store } from "../../store.entity";
import { Inject } from "@nestjs/common";
import { IStoreRepository } from "../../../repositories/store.repository";


export class StoreFindByEmailStrategy implements FindByEmailStrategy<Store> {
  constructor(
    @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository
  ) {}

  async findByEmail(email: string): Promise<Store> {
    if (!this.storeRepository) {
      throw new Error('StoreRepository is not defined');
    }
    return this.storeRepository.findByEmail(email);
  }
}