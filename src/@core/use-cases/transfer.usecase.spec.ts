// import { HttpService } from '@nestjs/axios';
// import { of } from 'rxjs';
// import { Money } from '../value-objects/money.vo';
// import { TransferFundsUseCase } from "./transfer.usecase";
// import { IUserRepository } from "../repositories/user.repository";
// import { IStoreRepository } from "../repositories/store.repository";
//
// describe('TransferFundsUseCase', () => {
//   let transferFundsUseCase: TransferFundsUseCase;
//   let userRepository: IUserRepository;
//   let storeRepository: IStoreRepository;
//   let httpService: HttpService;
//
//   beforeEach(() => {
//     userRepository = {
//       findById: jest.fn(),
//       update: jest.fn(),
//     } as any;
//
//     storeRepository = {
//       findById: jest.fn(),
//       update: jest.fn(),
//     } as any;
//
//     httpService = {
//       get: jest.fn(),
//       post: jest.fn(),
//     } as any;
//
//     transferFundsUseCase = new TransferFundsUseCase(userRepository, storeRepository, httpService);
//   });
//
//   it('should return money to payer if authorization fails', async () => {
//     const payer = {
//       id: 'payerId',
//       balance: new Money(100),
//       withdraw: jest.fn(),
//       deposit: jest.fn(),
//     };
//     const payee = {
//       id: 'payeeId',
//       balance: new Money(50),
//       deposit: jest.fn(),
//     };
//     const amount = new Money(30);
//
//     // Simula os métodos findById para payer e payee
//     (userRepository.findById as jest.Mock).mockResolvedValueOnce(payer);
//     (userRepository.findById as jest.Mock).mockResolvedValueOnce(payee);
//
//     // Simula uma resposta de autorização falhada
//     (httpService.get as jest.Mock).mockReturnValue(of({ data: { authorized: false } }));
//
//     try {
//       await transferFundsUseCase.execute('payerId', 'payeeId', amount);
//     } catch (error) {
//       expect(error.message).toBe('Transaction not authorized');
//     }
//
//     expect(payer.withdraw).toHaveBeenCalledWith(amount);
//     expect(payer.deposit).toHaveBeenCalledWith(amount);
//     expect(userRepository.update).toHaveBeenCalledWith(payer);
//     expect(storeRepository.update).not.toHaveBeenCalled();
//   });
// });
