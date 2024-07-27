import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";
//  @ValidateNested()  // Validates nested objects
//   @Type(() => Money) // Transforms the input to the Money class
export class CreateTransferDto {

  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;

  @IsNotEmpty({ message: 'Payer ID is required' })
  @IsUUID('4', { message: 'Payer ID must be a valid UUID' })
  payerId: string;

  @IsNotEmpty({ message: 'Payee ID is required' })
  @IsUUID('4', { message: 'Payee ID must be a valid UUID' })
  payeeId: string;
}
