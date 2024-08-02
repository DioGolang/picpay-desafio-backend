import { IRepository } from "../interfaces/repository.interface";
import { Store } from "../entities/store.entity";

export interface IStoreRepository extends IRepository<Store>{
  findByCnpj(cnpj: string): Promise<Store>;
}