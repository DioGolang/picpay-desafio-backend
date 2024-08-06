import { UserFactory } from "./user-factory";
import { StoreFactory } from "./store-factory";
import { IEntityFactory } from "../interfaces/entity-factory.interface";
import { User } from "../entities/user.entity";
import { Store } from "../entities/store.entity";


export class GenericFactory{
  private readonly userFactory: IEntityFactory<User>;
  private readonly storeFactory: IEntityFactory<Store>;

  constructor(){
    this.userFactory = new UserFactory();
    this.storeFactory = new StoreFactory();
  }

  create(type: string, data: any){
    switch (type){
      case "user":
        return this.userFactory.create(data);
      case "store":
        return this.storeFactory.create(data);
      default:
        throw new Error('Unknown entity type');
    }
  }

}