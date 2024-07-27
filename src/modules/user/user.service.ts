import { Inject, Injectable } from "@nestjs/common";
import { CreateUserUsecase } from "../../@core/use-cases/create-user.usecase";
import { IUserRepository } from "../../@core/repositories/user.repository";
import { User } from "../../@core/entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUsecase,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository
  ) { }

  async createUser(createUserDto : CreateUserDto): Promise<void>{
    await this.createUserUseCase.execute(createUserDto);
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

    async findStoreByEmail(email: string ): Promise<User | null>{
      return await this.userRepository.findByEmail(email);
    }

  }

