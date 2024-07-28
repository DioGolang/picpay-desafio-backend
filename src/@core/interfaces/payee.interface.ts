import { Money } from "../value-objects/money.vo";

export interface Payee {
  id: string | null;
  deposit(amount: Money): void;
  withdraw(amount: Money): void;
  get balance(): Money;
}
