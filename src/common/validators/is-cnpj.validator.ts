import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IsCpfConstraint } from "./is-cpf.validator";


@ValidatorConstraint({ async: false })
export class IsCnpjConstraint implements ValidatorConstraintInterface {

  validate(value: string): boolean {
    if (!value) return false;
    const cnpjRegex = /^\d{14}$/;
    if (!cnpjRegex.test(value)) return false;

    const removeSpecialCharacters = (cnpj: string): string => {
      return cnpj.replace(/\D/g, '');
    };

    const isSequence = (cnpj: string): boolean => {
      return cnpj[0].repeat(cnpj.length) === cnpj;
    };

    const calculateDigit = (digits: string, factor: number): number => {
      let sum = 0;
      for (let i = 0; i < digits.length; i++) {
        sum += parseInt(digits[i]) * factor;
        factor = factor === 2 ? 9 : factor - 1;
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const isValid = (cnpj: string): boolean => {
      const cnpjCleaned = removeSpecialCharacters(cnpj);
      if (isSequence(cnpjCleaned)) return false;
      if (cnpjCleaned.length !== 14) return false;
      const digit1 = calculateDigit(cnpjCleaned.substring(0, 12), 5);
      const digit2 = calculateDigit(cnpjCleaned.substring(0, 12) + digit1, 6);
      return cnpjCleaned.endsWith(`${digit1}${digit2}`);
    };

    return isValid(value);
  }


  defaultMessage(validationArguments?: ValidationArguments): string {
    return `CNPJ ${validationArguments.value} is invalid`;
  }

}