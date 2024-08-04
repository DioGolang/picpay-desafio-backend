import { Money } from "../value-objects/money.vo";

export interface IAccount{
  id: string | null;
  fullName: string;
  email: string;
  password: string;
  get balance(): Money;
  verifyPassword(password: string): Promise<boolean>;
  deposit(amount: Money): void;
  withdraw(amount: Money): void;
}
