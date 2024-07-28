import { Controller, Post, Body, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "../../common/filters/http-exception/http-exception.filter";
import { CreateTransferDto } from "./dto/create-transfer.dto";
import { TransferService } from "./transfer.service";

@Controller("transfer")
@UseFilters(new HttpExceptionFilter())
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async transfer(@Body() createTransferDto: CreateTransferDto) {
  //  const { amount, payerId, payeeId } = createTransferDto;
    await this.transferService.executeTransfer(createTransferDto);
  }
}
