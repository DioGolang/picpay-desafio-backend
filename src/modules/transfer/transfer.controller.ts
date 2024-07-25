import { Controller, Post, Body, Request } from '@nestjs/common';
import { TransferService } from "../../@core/services/transfer/transfer.service";
import { Money } from "../../@core/value-objects/money.vo";

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) { }

  @Post()
  async transfer(@Request() req, @Body() {amount, payeeId} : { amount: number, payeeId: string }){
    const payerId = req.user.userId;
    const moneyAmount = new Money(amount);
    await this.transferService.transfer(payerId, payeeId, moneyAmount);
  }
}

