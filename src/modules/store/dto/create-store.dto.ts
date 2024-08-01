import { IsEmail, IsNotEmpty, Length, Validate } from "class-validator";
import { IsUnique } from "../../../validators/is-unique.decorator";

export class CreateStoreDto {
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsNotEmpty({ message: 'CNPJ is required' })
  @Length(14, 14, { message: 'CNPJ must be 14 characters' })
  //@IsUnique('cnpj', { message: 'CNPJ must be unique' })
  cnpj: string;


  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  //@IsUnique('email', { message: 'Email must be unique' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}