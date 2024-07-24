import { Money } from "../value-objects/money.vo";

export class Store {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly cnpj: string,
    public readonly email: string,
    public readonly password: string,
    private _balance: Money,
  ){ }

  get balance(): Money{
    return this._balance;
  }


  deposit(amount: Money): void{
    this._balance = this._balance.add(amount)
  }

  withdraw(amount: Money): void {
    this._balance = this._balance.subtract(amount);
  }


}