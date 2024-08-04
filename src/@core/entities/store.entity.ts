import { Money } from "../value-objects/money.vo";
import { StoreValidate } from "../services/validation/store.validate";
import { Payee } from "../interfaces/payee.interface";
import * as bcrypt from 'bcrypt';
import { IAccountStore } from "../interfaces/account-store.interface";

export class Store implements IAccountStore, Payee {
  private readonly _validator: StoreValidate;

  constructor(
    public readonly id: string | null,
    public readonly fullName: string,
    public readonly cnpj: string,
    public readonly email: string,
    public readonly password: string,
    private _balance: Money,
    validator?: StoreValidate
  ) {
    this._validator = validator || new StoreValidate();
    this._validator.validate(this);
  }

  get balance(): Money {
    return this._balance;
  }

  verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  static create(fullName: string, cnpj: string, email: string, password: string): Store {
   const passwordHash = bcrypt.hashSync(password, 10);
    return new Store(null, fullName, cnpj, email, passwordHash, new Money(0));
  }

  deposit(amount: Money): void {
    this._balance = this._balance.add(amount);
  }

  withdraw(amount: Money): void {
    this._balance = this._balance.subtract(amount);
  }


}

