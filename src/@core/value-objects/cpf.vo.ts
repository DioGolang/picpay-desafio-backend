export class Cpf{
  constructor(private readonly cpf: string) {
    this.validate(cpf);
  }

  get value(): string {
    return this.cpf;
  }

  private validate(cpf: string): void {
    if (!this.isValid(cpf)) {
      throw new Error('Invalid CPF');
    }
  }

  private isValid(cpf: string): boolean {
    if (!cpf) return false;
    if (cpf.length != 11) return false;
  }
}