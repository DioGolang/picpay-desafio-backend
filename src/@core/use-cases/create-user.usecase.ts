import { IUserRepository } from "../repositories/user.repository";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";

@Injectable()
export class CreateUserUsecase{
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async execute(fullName: string, cpf: string, email: string, password: string): Promise<void> {
    const user = User.create(fullName, cpf, email, password);
    await this.userRepository.save(user);
  }
}