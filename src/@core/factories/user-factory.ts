import { IEntityFactory } from "../interfaces/entity-factory.interface";
import { IHasher } from "../interfaces/hasher.interface";
import { User } from "../entities/user.entity";
import { Money } from "../value-objects/money.vo";

type Userdata = {
  id: string | null;
  fullName: string;
  cpf: string;
  email: string;
  password: string;
  hasher: IHasher;
}

export class UserFactory implements IEntityFactory<User>{
  async create(data: Userdata): Promise<User>{
    const passwordHash = await data.hasher.hash(data.password);
    return new User(
      data.id,
      data.fullName,
      data.cpf,
      data.email,
      passwordHash,
      new Money(0),
      data.hasher
    );
  }
}

