import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { StoreUsecaseModule } from './store-usecase/store.usecase.module';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
  imports: [StoreUsecaseModule],
})
export class StoreModule {}