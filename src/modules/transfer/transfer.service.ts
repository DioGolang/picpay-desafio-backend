import { Injectable } from '@nestjs/common';
import { TransferFundsUseCase } from "../../@core/use-cases/transfer.usecase";
import { CreateTransferDto } from "./dto/create-transfer.dto";
import { PrismaService } from "../../infrastructure/database/prisma/prisma.service";

@Injectable()
export class TransferService {
  constructor(private readonly executeTransferUseCase: TransferFundsUseCase, private prismaService: PrismaService) {}

  async executeTransfer(createTransferDto: CreateTransferDto): Promise<void> {
    await this.executeTransferUseCase.execute(createTransferDto);
  }

  async Transfer(createTransferDto: CreateTransferDto): Promise<void> {
    const { amount, payerId, payeeId } = createTransferDto;
    await this.prismaService.transaction.create({
      data: {
        amount: amount,
        payerId: payerId,
        payeeId: payeeId,
        status: 'COMPLETED'
      }
    });
  }

}
