import { FindByEmailStrategy } from "./find-by-email.strategy";
import { User } from "../../user.entity";
import { Inject } from "@nestjs/common";
import { UserRepository } from "../../../../infrastructure/database/user.repository";

export class UserByEmailStrategy implements FindByEmailStrategy<User> {

  constructor(
    @Inject('IUserRepository') private readonly userRepository: UserRepository
  ) {}

  async findByEmail(email: string): Promise<User> {
    if (!this.userRepository) {
      throw new Error('UserRepository is not defined');
    }
    return await this.userRepository.findByEmail(email);
  }
}