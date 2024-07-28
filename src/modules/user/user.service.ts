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
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      console.error('Error in findUserById:', error);
      throw error;
    }
  }

    async findUserByEmail(email: string ): Promise<User | null>{
      return await this.userRepository.findByEmail(email);
    }

  async findUserByOne(idOrEmail: string): Promise<User | null>{
    return await this.userRepository.findOne(idOrEmail);
  }

  }

