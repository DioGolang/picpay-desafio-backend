import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { IsCnpj } from "../../common/validators/is-cnpj.decorator";


export class CreateStoreDto {
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsNotEmpty({ message: 'CNPJ is required' })
  //@IsUnique('cnpj', { message: 'CNPJ must be unique' })
  @IsCnpj({ message: 'CNPJ is invalid' })
  cnpj: string;


  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  //@IsUnique('email', { message: 'Email must be unique' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}