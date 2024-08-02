import { Inject, Injectable } from "@nestjs/common";
import { IStoreRepository } from '../../../repositories/store.repository';
import { UpdateStrategy } from "./update.strategy";
import { Store } from "../../store.entity";

@Injectable()
export class StoreUpdateStrategy implements UpdateStrategy {
  constructor(
    @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository
  ) {}

  async update(store: Store): Promise<void> {
    if (!this.storeRepository) {
      throw new Error('StoreRepository is not defined');
    }
    await this.storeRepository.update(store);
  }
}
