import { Money } from "../value-objects/money.vo";

export class User{
  constructor(
    public readonly id: string | null,
    public readonly fullName: string,
    public readonly cpf: string,
    public readonly email: string,
    public readonly password: string,
    private _balance: Money,
  ){ }

  get balance(): Money{
    return this._balance;
  }

  static create(fullName: string, cnpj: string, email: string, password: string): User {
    return new User(null, fullName, cnpj, email, password, new Money(0));
  }

  deposit(amount: Money): void{
    this._balance = this._balance.add(amount)
  }

  withdraw(amount: Money): void {
    this._balance = this._balance.subtract(amount);
  }

}