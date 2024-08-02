import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from "../../../dto/transfer/create-transfer.dto";
import { TransferFundsUseCase } from "../../../@core/use-cases/transfer.usecase";


@Injectable()
export class TransferService {
  constructor(private readonly executeTransferUseCase: TransferFundsUseCase) {}

  async executeTransfer(createTransferDto: CreateTransferDto): Promise<void> {
    await this.executeTransferUseCase.execute(createTransferDto);
  }

}
