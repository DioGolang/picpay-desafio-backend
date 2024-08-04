import { Money } from "../value-objects/money.vo";


export interface IAccount{
  id: string | null;
  fullName: string;
  email: string;
  password: string;
  balance: Money;
  verifyPassword(password: string): boolean;
  deposit(amount: Money): void;
  withdraw(amount: Money): void;
}
