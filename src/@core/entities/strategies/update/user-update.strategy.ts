import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from '../../../repositories/user.repository';
import { User } from "../../user.entity";
import { UpdateStrategy } from "./update.strategy";

@Injectable()
export class UserUpdateStrategy implements UpdateStrategy {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository
  ) {}

  async update(user: User): Promise<void> {
    if (!this.userRepository) {
      throw new Error('UserRepository is not defined');
    }
    await this.userRepository.update(user);
  }
}
