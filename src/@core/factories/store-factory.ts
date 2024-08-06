import { Money } from "../value-objects/money.vo";
import { IHasher } from "../interfaces/hasher.interface";
import { Store } from "../entities/store.entity";
import { IEntityFactory } from "../interfaces/entity-factory.interface";

type StoreData = {
  id: string | null;
  fullName: string;
  cnpj: string;
  email: string;
  password: string;
  hasher: IHasher;
}


export class StoreFactory implements IEntityFactory<Store>{
  async create(data: StoreData): Promise<Store>{
    const passwordHash = await data.hasher.hash(data.password);
    return new Store(
      data.id,
      data.fullName,
      data.cnpj,
      data.email,
      passwordHash,
      new Money(0),
      data.hasher,
  );
  }
}