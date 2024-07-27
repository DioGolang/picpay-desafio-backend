import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IUserRepository } from '../repositories/user.repository';
import { IStoreRepository } from '../repositories/store.repository';
import { CreateTransferDto } from '../../modules/transfer/dto/create-transfer';
import { Money } from "../value-objects/money.vo";

@Injectable()
export class TransferFundsUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository,
    private readonly httpService: HttpService,
  ) {}

  async execute(createTransferDto: CreateTransferDto): Promise<void> {
    const { amount, payerId, payeeId } = createTransferDto;
    const payer = await this.userRepository.findById(payerId);
    const payeeUser = await this.userRepository.findById(payeeId);
    const payeeStore = await this.storeRepository.findById(payeeId);
    const money = new Money(amount);

    const payee = payeeUser || payeeStore;

    if (!payer || !payee) {
      throw new Error('Invalid transaction');
    }

    if (payer.balance.value < money.value) {
      throw new Error('Insufficient balance');
    }

    payer.withdraw(money);

    const authorizeResponse = await firstValueFrom(this.httpService.get('https://util.devi.tools/api/v2/authorize'));
    if (!authorizeResponse.data.authorized) {
      payer.deposit(money);
      throw new Error('Transaction not authorized');
    }

    payee.deposit(money);

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