import { IValidate } from "../../interfaces/validate.interface";
import { User } from "../../entities/user.entity";

export class UserValidate implements IValidate<User>{
    validate(entity: User): void {
      this.validateFullName(entity.fullName);
      this.validateCpf(entity.cpf);
      this.validateEmail(entity.email);
      this.validatePassword(entity.password);
    }

  private validateFullName(fullName: string): void {
    if (!fullName || fullName.length === 0) {
      throw new Error('Full name is required');
    }
  }

  private validateCpf(cpf: string): void {
    if (!cpf || cpf.length !== 11) {
      throw new Error('CPF must be 11 characters');
    }
  }

  private validateEmail(email: string): void {
    if (!email || !email.includes('@')) {
      throw new Error('Email is invalid');
    }
  }

  private validatePassword(password: string): void {
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  }

}