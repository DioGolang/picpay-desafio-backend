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
    const user = new User(null, fullName, cnpj, email, password, new Money(0));
    user.validate()
    return user;
  }

  deposit(amount: Money): void{
    this._balance = this._balance.add(amount)
  }

  withdraw(amount: Money): void {
    this._balance = this._balance.subtract(amount);
  }

  private validate(): void {
    if (!this.fullName || this.fullName.length === 0) {
      throw new Error('Full name is required');
    }
    if (!this.cpf || this.cpf.length !== 11) {
      throw new Error('CPF must be 11 characters');
    }
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Email is invalid');
    }
    if (!this.password || this.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  }

}