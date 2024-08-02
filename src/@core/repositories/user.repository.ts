import { IRepository } from "../interfaces/repository.interface";
import { User } from "../entities/user.entity";

export interface IUserRepository extends IRepository<User>{
  findByCpf(cpf: string): Promise<User>;
}