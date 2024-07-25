import { Money } from "../value-objects/money.vo";
import { User } from "./user.entity";

export class Store {
  constructor(
    public readonly id: string | null,
    public readonly fullName: string,
    public readonly cnpj: string,
    public readonly email: string,
    public readonly password: string,
    private _balance: Money,
  ){ }

  get balance(): Money{
    return this._balance;
  }

  static create(fullName: string, cnpj: string, email: string, password: string): Store {
    return new Store(null, fullName, cnpj, email, password, new Money(0));
  }

  deposit(amount: Money): void{
    this._balance = this._balance.add(amount)
  }

  withdraw(amount: Money): void {
    this._balance = this._balance.subtract(amount);
  }


}