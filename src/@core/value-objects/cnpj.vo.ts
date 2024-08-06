export class Cnpj {

  constructor(private readonly value: string) {
    this.validate(value);
  }

  get value(): string {
    return this.value;
  }

  get MAX_DIGITS(): number {
    return 14;
  }

  get FACTOR_DIGIT_1(): number {
    return 5;
  }

  get FACTOR_DIGIT_2(): number {
    return 6;
  }

  private removeSpecialCharacters(cnpj: string): string {
    return cnpj.replace(/\D/g, '');
  }

  private isSequence(cnpj: string): boolean {
    return cnpj[0].repeat(cnpj.length) === cnpj;
  }

  private calculateDigit(digits: string, factor: number): number {
    let sum = 0;
    if (factor < 2 ){
      factor = 9;
      }
    for (let i = 0; i < digits.length; i++) {
      sum += parseInt(digits[i]) * factor;
      factor--;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  private isValid(cnpj: string): boolean {
    const cnpjCleaned = this.removeSpecialCharacters(cnpj);
    if (this.isSequence(cnpjCleaned)) return false;
    if (cnpjCleaned.length !== this.MAX_DIGITS) return false;
    const digit1 = this.calculateDigit(cnpjCleaned.substring(0,12), this.FACTOR_DIGIT_1);
    const digit2 = this.calculateDigit(cnpjCleaned.substring(0, 12) + digit1, this.FACTOR_DIGIT_2);
    return cnpjCleaned.endsWith(`${digit1}${digit2}`);
  }

  private validate(cnpj: string): void {
    if (!this.isValid(cnpj)) {
      throw new Error('Invalid CNPJ');
    }
  }

}

