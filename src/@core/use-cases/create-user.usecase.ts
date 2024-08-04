import { IUserRepository } from "../repositories/user.repository";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../../dto/user/create-user.dto";
import { IHasher } from "../interfaces/hasher.interface";


@Injectable()
export class CreateUserUsecase{
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IHasher') private readonly hasher: IHasher
  ) {}

  async execute(createUserDto : CreateUserDto): Promise<void> {
    const { fullName, cpf, email, password } = createUserDto;
    const user = await User.create(fullName, cpf, email, password, this.hasher);
    await this.userRepository.save(user);
  }
}