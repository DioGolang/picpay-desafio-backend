import { Money } from "../value-objects/money.vo";

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly amount: Money,
    public readonly  createdAt: Date,
    public readonly payerId: string,
    public readonly payeeId: string,
  ) { }

}