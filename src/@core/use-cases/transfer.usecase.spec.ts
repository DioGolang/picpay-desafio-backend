import { TransferFundsUseCase } from './transfer.usecase';
import { HttpService } from '@nestjs/axios';
import { Money } from '../value-objects/money.vo';
import { IUserRepository } from "../repositories/user.repository";
import { IStoreRepository } from "../repositories/store.repository";
import { of } from 'rxjs';

describe('TransferFundsUseCase', () => {
  let transferFundsUseCase: TransferFundsUseCase;
  let userRepository: IUserRepository;
  let storeRepository: IStoreRepository;
  let httpService: HttpService;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    storeRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    httpService = {
      get: jest.fn(),
      post: jest.fn(),
    } as any;

    transferFundsUseCase = new TransferFundsUseCase(userRepository, storeRepository, httpService);
  });

  it('should return money to payer if authorization fails', async () => {
    const payer = {
      id: 'payerId',
      balance: new Money(100),
      withdraw: jest.fn(),
      deposit: jest.fn(),
    };
    const payee = {
      id: 'payeeId',
      balance: new Money(50),
      deposit: jest.fn(),
    };
    const amount = new Money(30);

    (userRepository.findById as jest.Mock).mockResolvedValueOnce(payer);
    (userRepository.findById as jest.Mock).mockResolvedValueOnce(payee);
    (httpService.get as jest.Mock).mockReturnValue(of({ data: { authorized: false } }));

    try {
      await transferFundsUseCase.execute('payerId', 'payeeId', amount);
    } catch (error) {
      expect(error.message).toBe('Transaction not authorized');
    }

    expect(payer.withdraw).toHaveBeenCalledWith(amount);
    expect(payer.deposit).toHaveBeenCalledWith(amount);
    expect(userRepository.update).toHaveBeenCalledWith(payer);
    expect(storeRepository.update).not.toHaveBeenCalled();
  });
});
