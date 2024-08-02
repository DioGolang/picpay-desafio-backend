import { User } from "../../entities/user.entity";
import { Store } from "../../entities/store.entity";


export interface IAuthService {
  validate(email: string, password: string): Promise< User | Store | null>;
  generateToken(user: User | Store): string;
}
