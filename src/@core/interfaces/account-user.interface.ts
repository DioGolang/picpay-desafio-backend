import { IAccount } from "./account.interface";

export interface IAccountUser extends IAccount{
  cpf: string,
}