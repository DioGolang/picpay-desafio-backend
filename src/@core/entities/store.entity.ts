import { Money } from "../value-objects/money.vo";
import { StoreValidate } from "../services/validation/store.validate";
import { Payee } from "../interfaces/payee.interface";
import { IAccountStore } from "../interfaces/account-store.interface";
import { IHasher } from "../interfaces/hasher.interface";

export class Store implements IAccountStore, Payee {
  private readonly _validator: StoreValidate;
  private readonly _hashPassword: IHasher;
  private _balance: Money;

  constructor(
    public readonly id: string | null,
    public readonly fullName: string,
    public readonly cnpj: string,
    public readonly email: string,
    public readonly password: string,
    balance: Money,
    hashPassword: IHasher,
    validator?: StoreValidate
  ) {
    this._balance = balance;
    this._hashPassword = hashPassword;
    this._validator = validator || new StoreValidate();
    this._validator.validate(this);
  }

  get balance(): Money {
    return this._balance;
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await this._hashPassword.compare(password, this.password);
  }

  static async create(fullName: string, cnpj: string, email: string, password: string, hashPassword: IHasher): Promise<Store> {
    const passwordHash = await hashPassword.hash(password);
    return new Store(null, fullName, cnpj, email, passwordHash, new Money(0), hashPassword);
  }

  deposit(amount: Money): void {
    this._balance = this._balance.add(amount);
  }

  withdraw(amount: Money): void {
    this._balance = this._balance.subtract(amount);
  }
}
