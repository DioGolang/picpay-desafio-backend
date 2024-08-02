import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../user.entity";
import { Store } from "../../store.entity";

@Injectable()
export class FindByEmailStrategy<T> {
  private strategies = new Map<string, FindByEmailStrategy<T>>();

  constructor(
    @Inject('UserFindByEmailStrategy') private readonly userFindByEmailStrategy: FindByEmailStrategy<User>,
    @Inject('StoreFindByEmailStrategy') private readonly storeFindByEmailStrategy: FindByEmailStrategy<Store>
  ) {
    this.strategies.set('user', this.userFindByEmailStrategy);
    this.strategies.set('store', this.storeFindByEmailStrategy);
  }

  getStrategy(type: string): FindByEmailStrategy<T> {
    const strategy = this.strategies.get(type);
    if (!strategy) {
      throw new Error(`Authentication strategy for type ${type} not found`);
    }
    return strategy;
  }
}