import { Module } from '@nestjs/common';
import { UserFactory } from "../../../@core/factories/user-factory";
import { StoreFactory } from "../../../@core/factories/store-factory";
import { GenericFactory } from "../../../@core/factories/generic-factory";

@Module({
  providers:[
    {
      provide: 'IEntityFactory<User>',
      useClass: UserFactory,
    },
    {
      provide: 'IEntityFactory<Store>',
      useClass: StoreFactory,
    },
    GenericFactory,
  ],
  exports:[GenericFactory],
})
export class FactoryModule {}
