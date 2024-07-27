import { IsEmail, IsNotEmpty, Length, Validate } from "class-validator";
import { IsUniqueConstraint } from "../../../validators/is-unique.validator";

export class CreateUserDto {
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  // @Validate(IsUniqueConstraint, ['cnpj'], {message: "Cnpj must be unique"})
  @IsNotEmpty({ message: 'CPF is required' })
  @Length(11, 11, { message: 'CPF must be 14 characters' })
  cpf: string;

  // @Validate(IsUniqueConstraint, ['email'], {message: "Email must be unique"})
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}