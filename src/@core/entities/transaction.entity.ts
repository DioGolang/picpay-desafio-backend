import { Money } from "../value-objects/money.vo";
import { TransferStatus } from "./transaction-status.enum";
import { Payer } from "../interfaces/payer.interface";
import { Payee } from "../interfaces/payee.interface";

export class Transaction {
  constructor(
    public readonly id: string | null,
    public readonly amount: Money,
    public readonly payer: Payer,
    public readonly payee: Payee,
    public status: TransferStatus = TransferStatus.PENDING
  ) {
    this.validate()
  }

  private validate(): void {
    if (!this.payer || !this.payee) {
      throw new Error('Payer and payee must be defined');
    }
    if (!this.amount || this.amount.value <= 0) {
      throw new Error('Amount must be greater than zero');
    }
  }

  validateSufficientBalance(): void {
    if (this.payer.balance.value < this.amount.value) {
      throw new Error('Insufficient balance');
    }
  }

  complete(): void {
    this.status = TransferStatus.COMPLETED;
  }

  fail(): void {
    this.status = TransferStatus.FAILED;
  }

  rollback(): void {
    this.payer.deposit(this.amount);
    this.payee.withdraw(this.amount);
    this.fail();
  }
}