import {
  Controller,
  Post,
  Body,
  UseFilters,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus, UseGuards
} from "@nestjs/common";
import { CreateTransferDto } from "../../../dto/transfer/create-transfer.dto";
import { TransferService } from "../../../application/services/transfer/transfer.service";
import { HttpExceptionFilter } from "../../../common/filters/http-exception/http-exception.filter";
import { JwtAuthGuard } from "../../../application/guards/auth/jwt-auth.guard";

@Controller("transfer")
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async transfer(@Body() createTransferDto: CreateTransferDto) {
    try {
      await this.transferService.executeTransfer(createTransferDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
