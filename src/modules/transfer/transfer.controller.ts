import { Controller, Post, Body, Request, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { TransferService } from "../../@core/services/transfer/transfer.service";
import { HttpExceptionFilter } from "../../filters/http-exception/http-exception.filter";
import { CreateTransferDto } from "./dto/create-transfer";


@Controller('transfer')
@UseFilters(new HttpExceptionFilter())
export class TransferController {
  constructor(private readonly transferService: TransferService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async transfer(@Request() req, @Body() createTransferDto: CreateTransferDto) {
    const { amount, payeeId } = createTransferDto;
    const payerId = req.user.userId;
    await this.transferService.transfer(payerId, payeeId, amount);
  }
}
