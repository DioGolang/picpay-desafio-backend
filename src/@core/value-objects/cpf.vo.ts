export class Cpf{
  constructor(private readonly cpf: string) {
    this.validate(cpf);
  }

  get value(): string {
    return this.cpf;
  }

  get MAX_DIGITS(): number {
    return 11;
  }

  get FACTOR_DIGIT_1(): number {
    return 10;
  }
  get FACTOR_DIGIT_2(): number {
    return 11;
  }

  private removeSpecialCharacters(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  private isSequence(cpf: string): boolean {
    return cpf[0].repeat(cpf.length) === cpf;
  }

  private calculateDigit(digits: string, factor: number): number {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += parseInt(digits[i]) * factor;
      factor--;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  private isValid(cpf: string): boolean {
    const cpfCleaned = this.removeSpecialCharacters(cpf);
    if (this.isSequence(cpfCleaned)) return false;
    if (cpfCleaned.length !== this.MAX_DIGITS) return false;
    const digit1 = this.calculateDigit(cpfCleaned.substring(0,9), this.FACTOR_DIGIT_1);
    const digit2 = this.calculateDigit(cpfCleaned.substring(0, 9) + digit1, this.FACTOR_DIGIT_2);
    return cpfCleaned.endsWith(`${digit1}${digit2}`);
  }

  private validate(cpf: string): void {
    if (!this.isValid(cpf)) {
      throw new Error('Invalid CPF');
    }
  }

}