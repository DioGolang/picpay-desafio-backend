import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable, Inject } from '@nestjs/common';
import { IRepository } from '../../@core/interfaces/repository.interface';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject('IRepository<Store>') private readonly repository: IRepository<any> // Ajuste o tipo para qualquer tipo genérico
  ) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [property] = args.constraints;
    const entity = await this.repository.findByConditions({ [property]: value });
    return !entity;
  }

  defaultMessage(args: ValidationArguments): string {
    const [property] = args.constraints;
    return `${property} must be unique`;
  }
}
