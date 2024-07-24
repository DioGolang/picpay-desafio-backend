// import { Injectable } from '@nestjs/common';
// import { IUserRepository } from "../../repositories/user.repository";
// import { IStoreRepository } from "../../repositories/store.repository";
//
// @Injectable()
// export class TransferService {
//   constructor(
//     private readonly userRepository: IUserRepository,
//     private readonly storeRepository: IStoreRepository,
//   ) { }
//
//   async transfer(payerId: string, payeeId: string, amount: number): Promise<void>{
//     const payer = await this.userRepository.findById(payerId);
//     const payee = await this.userRepository.findById(payeeId) || await this.storeRepository.findById(payeeId);
//
//     payer.balance -= amount;
//     payee.balance += amount;
//
//   }
//
// }
