import { IAccount } from "./account.interface";

export interface IAcountStore extends IAccount{
  cnpj: string;
}