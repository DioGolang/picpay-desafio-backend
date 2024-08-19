import { IUserRepository } from "../repositories/user.repository";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../../dto/user/create-user.dto";
import { IHasher } from "../interfaces/hasher.interface";
import { GenericFactory } from "../factories/generic-factory";


@Injectable()
export class CreateUserUsecase{
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject(GenericFactory) private readonly genericFactory: GenericFactory,
    @Inject('IHasher') private readonly hasher: IHasher
  ) {}

  async execute(createUserDto : CreateUserDto): Promise<void> {
    const { fullName, cpf, email, password } = createUserDto;
    const user = await this.genericFactory.create('user', {
      id: null,
      fullName,
      cpf,
      email,
      password,
      hasher: this.hasher
    }) as User;
    await this.userRepository.save(user);
  }
}