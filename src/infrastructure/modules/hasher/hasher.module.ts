import { Module } from '@nestjs/common';
import { BcryptHasherService } from "../../services/bcrypt-hasher.service";


@Module({
  providers: [
    {
      provide: 'IHasher',
      useClass: BcryptHasherService,
    },
  ],
  exports: ['IHasher'],
})
export class HasherModule {}
