import { IHasher } from "../../@core/interfaces/hasher.interface";
import * as bcrypt from 'bcrypt';

export class BcryptHasherService implements IHasher {
  private readonly saltRounds: number = 10;

  async hash(payload: string): Promise<string> {
    return await bcrypt.hash(payload, this.saltRounds);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(payload, hashed);
  }
}
