import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '../repositories/user.repository';
import { IStoreRepository } from '../repositories/store.repository';
import { TransactionRepository } from '../../infrastructure/database/transaction.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { TransferDomainService } from '../services/transfer-domain/transfer-domain.service';
import { AuthorizationService } from '../../infrastructure/external/authorization/authorization.service';
import { NotificationService } from '../../infrastructure/external/notification/notification.service';
import { CreateTransferDto } from '../../modules/transfer/dto/create-transfer.dto';
import { Money } from '../value-objects/money.vo';
import { TransferFundsUseCase } from './transfer.usecase';
import { User } from '../entities/user.entity';
import { Store } from '../entities/store.entity';
import { Transaction} from '../entities/transaction.entity';
import { TransferStatus } from "../entities/transaction-status.enum";

jest.mock('../repositories/user.repository');
jest.mock('../repositories/store.repository');
jest.mock('../../infrastructure/database/transaction.repository');
jest.mock('../../infrastructure/database/prisma/prisma.service');
jest.mock('../services/transfer-domain/transfer-domain.service');
jest.mock('../../infrastructure/external/authorization/authorization.service');
jest.mock('../../infrastructure/external/notification/notification.service');

describe('TransferFundsUseCase', () => {
  let transferFundsUseCase: TransferFundsUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let storeRepository: jest.Mocked<IStoreRepository>;
  let transactionRepository: jest.Mocked<TransactionRepository>;
  let prismaService: jest.Mocked<PrismaService>;
  let transferDomainService: jest.Mocked<TransferDomainService>;
  let authorizationService: jest.Mocked<AuthorizationService>;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferFundsUseCase,
        { provide: 'IUserRepository', useValue: userRepository },
        { provide: 'IStoreRepository', useValue: storeRepository },
        { provide: TransactionRepository, useValue: transactionRepository },
        { provide: PrismaService, useValue: prismaService },
        { provide: TransferDomainService, useValue: transferDomainService },
        { provide: AuthorizationService, useValue: authorizationService },
        { provide: NotificationService, useValue: notificationService },
      ],
    }).compile();

    transferFundsUseCase = module.get<TransferFundsUseCase>(TransferFundsUseCase);
    userRepository = module.get<IUserRepository>('IUserRepository') as jest.Mocked<IUserRepository>;
    storeRepository = module.get<IStoreRepository>('IStoreRepository') as jest.Mocked<IStoreRepository>;
    transactionRepository = module.get<TransactionRepository>(TransactionRepository) as jest.Mocked<TransactionRepository>;
    prismaService = module.get<PrismaService>(PrismaService) as jest.Mocked<PrismaService>;
    transferDomainService = module.get<TransferDomainService>(TransferDomainService) as jest.Mocked<TransferDomainService>;
    authorizationService = module.get<AuthorizationService>(AuthorizationService) as jest.Mocked<AuthorizationService>;
    notificationService = module.get<NotificationService>(NotificationService) as jest.Mocked<NotificationService>;
  });

  it('should throw an error if payer or payee is not found', async () => {
    const createTransferDto: CreateTransferDto = { amount: 100, payerId: 'payer-id', payeeId: 'payee-id' };

    userRepository.findById.mockResolvedValueOnce(null);
    storeRepository.findById.mockResolvedValueOnce(null);

    await expect(transferFundsUseCase.execute(createTransferDto)).rejects.toThrow('Invalid transaction');
  });

  it('should throw an error if payer has insufficient balance', async () => {
    const createTransferDto: CreateTransferDto = { amount: 100, payerId: 'payer-id', payeeId: 'payee-id' };
    const payer = new User('payer-id', 'Payer Name', '12345678900', 'payer@example.com', 'password', new Money(50));

    userRepository.findById.mockResolvedValueOnce(payer);
    storeRepository.findById.mockResolvedValueOnce(null);
    userRepository.findById.mockResolvedValueOnce(new User('payee-id', 'Payee Name', '09876543211', 'payee@example.com', 'password', new Money(0)));

    await expect(transferFundsUseCase.execute(createTransferDto)).rejects.toThrow('Insufficient balance');
  });

  // it('should complete the transaction if all conditions are met', async () => {
  //   const createTransferDto: CreateTransferDto = { amount: 100, payerId: 'payer-id', payeeId: 'payee-id' };
  //   const payer = new User('payer-id', 'Payer Name', '12345678900', 'payer@example.com', 'password', new Money(200));
  //   const payee = new User('payee-id', 'Payee Name', '09876543211', 'payee@example.com', 'password', new Money(0));
  //   const transaction = new Transaction(null, new Money(100), payer, payee, TransferStatus.PENDING);
  //
  //   userRepository.findById.mockResolvedValueOnce(payer);
  //   userRepository.findById.mockResolvedValueOnce(payee);
  //   storeRepository.findById.mockResolvedValueOnce(null);
  //   prismaService.$transaction.mockImplementationOnce(async (callback) => {
  //     await callback(prismaService);
  //   });
  //   transferDomainService.initiateTransfer.mockResolvedValueOnce(transaction);
  //   transactionRepository.save.mockResolvedValueOnce(transaction);
  //   notificationService.notify.mockResolvedValueOnce(true);
  //
  //   await expect(transferFundsUseCase.execute(createTransferDto)).resolves.not.toThrow();
  //   expect(transferDomainService.initiateTransfer).toHaveBeenCalledWith(payer, payee, new Money(100));
  //   expect(transactionRepository.save).toHaveBeenCalled();
  //   expect(notificationService.notify).toHaveBeenCalled();
  // });

  it('should rollback the transaction if an error occurs', async () => {
    const createTransferDto: CreateTransferDto = { amount: 100, payerId: 'payer-id', payeeId: 'payee-id' };
    const payer = new User('payer-id', 'Payer Name', '12345678900', 'payer@example.com', 'password', new Money(200));
    const payee = new User('payee-id', 'Payee Name', '09876543211', 'payee@example.com', 'password', new Money(0));
    const transaction = new Transaction(null, new Money(100), payer, payee, TransferStatus.PENDING);

    userRepository.findById.mockResolvedValueOnce(payer);
    userRepository.findById.mockResolvedValueOnce(payee);
    storeRepository.findById.mockResolvedValueOnce(null);
    prismaService.$transaction.mockImplementationOnce(async (callback) => {
      await callback(prismaService);
    });
    transferDomainService.initiateTransfer.mockResolvedValueOnce(transaction);
    transactionRepository.save.mockImplementationOnce(() => { throw new Error('Database error'); });

    await expect(transferFundsUseCase.execute(createTransferDto)).rejects.toThrow('Database error');
    expect(transferDomainService.rollbackTransfer).toHaveBeenCalledWith(payer, payee, new Money(100));
  });
});