import { Injectable } from '@nestjs/common';
import { TransferFundsUseCase } from "../../@core/use-cases/transfer.usecase";
import { CreateTransferDto } from "./dto/create-transfer.dto";


@Injectable()
export class TransferService {
  constructor(private readonly executeTransferUseCase: TransferFundsUseCase) {}

  async executeTransfer(createTransferDto: CreateTransferDto): Promise<void> {
    await this.executeTransferUseCase.execute(createTransferDto);
  }

}
