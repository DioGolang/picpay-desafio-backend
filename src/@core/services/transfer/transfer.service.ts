import { TransferFundsUseCase } from "../../use-cases/transfer.usecase";
import { Money } from "../../value-objects/money.vo";

export class TransferService{
  constructor(private readonly transferFundsUseCase: TransferFundsUseCase) { }

  async transfer(payerId: string, payeeId: string, amount: Money): Promise<void> {
    await this.transferFundsUseCase.execute(payerId, payeeId, amount);
  }
}
