import { Money } from "../value-objects/money.vo";
import { UserValidate } from "../services/validation/user.validate";
import { Payer } from "../interfaces/payer.interface";
import { Payee } from "../interfaces/payee.interface";
import { IAccountUser } from "../interfaces/account-user.interface";
import { IHasher } from "../interfaces/hasher.interface";

export class User implements IAccountUser, Payer, Payee{

  private readonly _validator: UserValidate;
  private readonly _hashPassword: IHasher;
  private _balance: Money;

  constructor(
    public readonly id: string | null,
    public readonly fullName: string,
    public readonly cpf: string,
    public readonly email: string,
    public readonly password: string,
    balance: Money,
    hashPassword: IHasher,
    validator?: UserValidate
  ){
    this._balance = balance;
    this._hashPassword = hashPassword;
    this._validator = validator || new UserValidate();
    this._validator.validate(this);
  }

  get balance(): Money{
    return this._balance;
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await this._hashPassword.compare(password, this.password);
  }

  static async create(fullName: string, cnpj: string, email: string, password: string, hashPassword: IHasher): Promise<User> {
    const passwordHash = await hashPassword.hash(password);
    return new User(null, fullName, cnpj, email, passwordHash, new Money(0), hashPassword);
  }

  deposit(amount: Money): void{
    this._balance = this._balance.add(amount)
  }

  withdraw(amount: Money): void {
    this._balance = this._balance.subtract(amount);
  }

}