import { IHasher } from "../../@core/interfaces/hasher.interface";
import * as bcrypt from 'bcrypt';

export class BcryptHasherService implements IHasher {

  async hash(payload: string): Promise<string>{
    return bcrypt.hashSync(payload, 10);
  }

 async compare(payload: string, hashed: string): Promise<boolean>{
    return bcrypt.compareSync(payload, hashed);
  }

}