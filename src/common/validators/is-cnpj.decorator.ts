import { registerDecorator, ValidationOptions } from "class-validator";
import { IsCnpjConstraint } from "./is-cnpj.validator";


export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCnpjConstraint,
    });
  };
}