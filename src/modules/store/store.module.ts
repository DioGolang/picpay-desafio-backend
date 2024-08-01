import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { StoreUsecaseModule } from './store-usecase/store.usecase.module';

@Module({
  imports: [StoreUsecaseModule],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],

})
export class StoreModule {}