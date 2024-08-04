import { Money } from "../value-objects/money.vo";
import { UserValidate } from "../services/validation/user.validate";
import { Payer } from "../interfaces/payer.interface";
import { Payee } from "../interfaces/payee.interface";
import * as bcrypt from 'bcrypt';
import { IAccountUser } from "../interfaces/account-user.interface";

export class User implements IAccountUser, Payer, Payee{

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

  verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  static create(fullName: string, cpf: string, email: string, password: string): User {
    const passwordHash = bcrypt.hashSync(password, 10);
    return new User(null, fullName, cpf, email, passwordHash, new Money(0));
  }

  deposit(amount: Money): void{
    this._balance = this._balance.add(amount)
  }

  withdraw(amount: Money): void {
    this._balance = this._balance.subtract(amount);
  }

}