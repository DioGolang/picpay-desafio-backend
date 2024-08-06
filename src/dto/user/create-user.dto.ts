import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { IsCpf } from "../../common/validators/is-cpf.decorator";

export class CreateUserDto {
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsNotEmpty({ message: 'CPF is required' })
  @IsCpf({ message: 'CPF is invalid' })
  cpf: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}