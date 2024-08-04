import { IAccount } from "./account.interface";

export interface IAccountStore extends IAccount{
  cnpj: string;
}
