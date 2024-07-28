import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { IRepository } from '../@core/interfaces/repository.interface';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint<T> implements ValidatorConstraintInterface {
  constructor(private readonly repository: IRepository<T>) {}

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