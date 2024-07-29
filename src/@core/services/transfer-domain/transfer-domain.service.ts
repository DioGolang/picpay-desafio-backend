import { Inject, Injectable } from "@nestjs/common";
import { Money } from "../../value-objects/money.vo";
import { Transaction } from "../../entities/transaction.entity";
import { TransferStatus } from "../../entities/transaction-status.enum";
import { User } from "../../entities/user.entity";
import { Store } from "../../entities/store.entity";
import { UpdateStrategy } from "../../entities/strategies/update.strategy";

@Injectable()
export class TransferDomainService {
  constructor(
    @Inject('UserUpdateStrategy') private readonly userUpdateStrategy: UpdateStrategy,
    @Inject('StoreUpdateStrategy') private readonly storeUpdateStrategy: UpdateStrategy
  ) { }

  /**
   * Initiates a transfer from payer to payee.
   * @param payer The entity making the payment.
   * @param payee The entity receiving the payment.
   * @param amount The amount to be transferred.
   */
  async initiateTransfer(payer: User, payee: User | Store, amount: Money): Promise<Transaction> {
    try {
      payer.withdraw(amount);
      payee.deposit(amount);

      await this.userUpdateStrategy.update(payer);
      await this.getUpdateStrategy(payee).update(payee);

      const transfer = new Transaction(null, amount, payer, payee, TransferStatus.PENDING);
      transfer.validateSufficientBalance();
      transfer.complete();

      return transfer;
    } catch (error) {
      throw new Error('Error initiating transfer: ' + error.message);
    }
  }

  /**
   * Rolls back a transfer from payee to payer.
   * @param payer The entity to receive the payment.
   * @param payee The entity who made the payment.
   * @param amount The amount to be rolled back.
   */
  async rollbackTransfer(payer: User, payee: User | Store, amount: Money): Promise<void> {
    try {
      payee.withdraw(amount);
      payer.deposit(amount);

      await this.userUpdateStrategy.update(payer);
      await this.getUpdateStrategy(payee).update(payee);
    } catch (error) {
      throw new Error('Error rolling back transfer: ' + error.message);
    }
  }

  /**
   * Gets the appropriate update strategy based on the entity type.
   * @param entity The entity for which the update strategy is required.
   */
  private getUpdateStrategy(entity: User | Store): UpdateStrategy {
    return entity instanceof User ? this.userUpdateStrategy : this.storeUpdateStrategy;
  }
}
