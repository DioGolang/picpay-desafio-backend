import { Inject, Injectable } from "@nestjs/common";
import { CreateUserUsecase } from "../../@core/use-cases/create-user.usecase";
import { IUserRepository } from "../../@core/repositories/user.repository";
import { User } from "../../@core/entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUsecase,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository
  ) { }

  async createUser(fullName: string, cpf: string, email: string, password: string): Promise<void>{
    await this.createUserUseCase.execute(fullName, cpf, email, password);
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

    async findStoreByEmail(email: string ): Promise<User | null>{
      return await this.userRepository.findByEmail(email);
    }

  }

