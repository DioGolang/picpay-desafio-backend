import { Injectable } from '@nestjs/common';
import { Money } from '../value-objects/money.vo';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IUserRepository } from "../repositories/user.repository";
import { IStoreRepository } from "../repositories/store.repository";

@Injectable()
export class TransferFundsUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly storeRepository: IStoreRepository,
    private readonly httpService: HttpService,
  ) {}

  async execute(payerId: string, payeeId: string, amount: Money): Promise<void> {
    const payer = await this.userRepository.findById(payerId);
    const payeeUser = await this.userRepository.findById(payeeId);
    const payeeStore = await this.storeRepository.findById(payeeId);

    const payee = payeeUser || payeeStore;

    if (!payer || !payee) {
      throw new Error('Invalid transaction');
    }

    if (payer.balance.value < amount.value) {
      throw new Error('Insufficient balance');
    }

    payer.withdraw(amount);

    const authorizeResponse = await firstValueFrom(this.httpService.get('https://util.devi.tools/api/v2/authorize'));
    if (!authorizeResponse.data.authorized) {
      payer.deposit(amount);
      throw new Error('Transaction not authorized');
    }

    payee.deposit(amount);

    await this.userRepository.update(payer);
    if (payeeUser) {
      await this.userRepository.update(payeeUser);
    } else if (payeeStore) {
      await this.storeRepository.update(payeeStore);
    }

    try {
      await firstValueFrom(this.httpService.post('https://util.devi.tools/api/v1/notify', { payeeId }));
    } catch (error) {
      // Handle notification failure, but don't fail the entire transaction
    }
  }
}
