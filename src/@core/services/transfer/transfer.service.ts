import { Inject, Injectable } from "@nestjs/common";
import { TransferFundsUseCase } from "../../use-cases/transfer.usecase";

@Injectable()
export class TransferService {
  constructor(
    private readonly createTransferUseCase: TransferFundsUseCase,
    // @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    // @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository,
  ) {}

  async transfer(payerId: string, payeeId: string, amount: number): Promise<void> {
    // const payer = await this.repositoryUser.findById(payerId);
    // const payee = await this.repository.findById(payeeId);
    // const moneyAmount = new Money(amount)

    await this.createTransferUseCase.execute({amount, payerId, payeeId});
  }
}