import { Inject, Injectable } from "@nestjs/common";
import { Payer } from "../../interfaces/payer.interface";
import { Payee } from "../../interfaces/payee.interface";
import { Money } from "../../value-objects/money.vo";
import { Transaction } from "../../entities/transaction.entity";
import { TransferStatus } from "../../entities/transaction-status.enum";
import { IUserRepository } from '../../repositories/user.repository';
import { IStoreRepository } from '../../repositories/store.repository';
import { User } from "../../entities/user.entity";
import { Store } from "../../entities/store.entity";

@Injectable()
export class TransferDomainService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository,
  ) {}

  async initiateTransfer(payer: User, payee: User | Store, amount: Money): Promise<Transaction> {
    try {

      payer.withdraw(amount);
      payee.deposit(amount);

      await this.userRepository.update(payer);
      if (payee instanceof User) {
        await this.userRepository.update(payee);
      } else {
        await this.storeRepository.update(payee);
      }

      const transfer = new Transaction(null, amount, payer, payee, TransferStatus.PENDING);

      transfer.complete();
      return transfer;
    } catch (error) {
      throw new Error('Error starting transfer');
    }
  }

  async rollbackTransfer(payer: User, payee: User | Store, amount: Money): Promise<void> {
    try {
      payee.withdraw(amount);
      payer.deposit(amount);

      // Persist changes
      await this.userRepository.update(payer);
      if (payee instanceof User) {
        await this.userRepository.update(payee);
      } else {
        await this.storeRepository.update(payee);
      }
    } catch (error) {
      throw new Error('Error reversing transfer');
    }
  }
}