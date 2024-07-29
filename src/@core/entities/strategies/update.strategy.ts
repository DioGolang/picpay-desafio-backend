import { User } from "../user.entity";
import { Store } from "../store.entity";

export interface UpdateStrategy {
  update(entity: User | Store): Promise<void>;
}
