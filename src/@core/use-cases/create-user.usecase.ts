import { IUserRepository } from "../repositories/user.repository";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../../modules/user/dto/create-user.dto";

@Injectable()
export class CreateUserUsecase{
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async execute(createUserDto : CreateUserDto): Promise<void> {
    const { fullName, cpf, email, password } = createUserDto;
    const user = User.create(fullName, cpf, email, password);
    await this.userRepository.save(user);
  }
}