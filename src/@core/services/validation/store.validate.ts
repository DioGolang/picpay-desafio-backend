import { IValidate } from "../../interfaces/validate.interface";
import { Store } from "../../entities/store.entity";


export class StoreValidate implements IValidate<Store>{
  validate(entity: Store): void {
    this.validateFullName(entity.fullName);
    this.validateCnpj(entity.cnpj);
    this.validateEmail(entity.email);
    this.validatePassword(entity.password);
  }


  private validateFullName(fullName: string): void {
    if (!fullName || fullName.length === 0) {
      throw new Error('Full name is required');
    }
  }

  private validateCnpj(cnpj: string): void {
    if (!cnpj || cnpj.length !== 14) {
      throw new Error('CPF must be 14 characters');
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