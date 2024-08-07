import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {

  validate(cpf: string, args: ValidationArguments) {
    if (!cpf) return false;
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) return false;

    const removeSpecialCharacters = (cpf: string): string => {
      return cpf.replace(/\D/g, '');
    };

    const isSequence = (cpf: string): boolean => {
      return cpf[0].repeat(cpf.length) === cpf;
    };

    const calculateDigit = (digits: string, factor: number): number => {
      let sum = 0;
      for (let i = 0; i < digits.length; i++) {
        sum += parseInt(digits[i]) * factor;
        factor--;
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const isValid = (cpf: string): boolean => {
      const cpfCleaned = removeSpecialCharacters(cpf);
      if (isSequence(cpfCleaned)) return false;
      if (cpfCleaned.length !== 11) return false;
      const digit1 = calculateDigit(cpfCleaned.substring(0, 9), 10);
      const digit2 = calculateDigit(cpfCleaned.substring(0, 9) + digit1, 11);
      return cpfCleaned.endsWith(`${digit1}${digit2}`);
    };

    return isValid(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF is invalid';
  }
}