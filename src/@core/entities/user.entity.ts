import { Money } from "../value-objects/money.vo";
import { UserValidate } from "../services/validation/user.validate";
import { Payer } from "../interfaces/payer.interface";
import { Payee } from "../interfaces/payee.interface";

export class User implements Payer, Payee{

  private readonly _validator: UserValidate;

  constructor(
    public readonly id: string | null,
    public readonly fullName: string,
    public readonly cpf: string,
    public readonly email: string,
    public readonly password: string,
    private _balance: Money,
    validator?: UserValidate
  ){
    this._validator = validator || new UserValidate();
    this._validator.validate(this)
  }

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