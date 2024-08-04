import { User } from "../../user.entity";
import { Store } from "../../store.entity";

export interface UpdateStrategy {
  update(account: User | Store): Promise<void>;
}
