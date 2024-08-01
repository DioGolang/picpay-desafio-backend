import {
  Inject,
  Injectable,
} from "@nestjs/common";
import { IUserRepository } from '../repositories/user.repository';
import { IStoreRepository } from '../repositories/store.repository';
import { CreateTransferDto } from '../../modules/transfer/dto/create-transfer.dto';
import { Money } from "../value-objects/money.vo";
import { TransactionRepository } from "../../infrastructure/database/transaction.repository";
import { TransferDomainService } from "../services/transfer-domain/transfer-domain.service";
import { PrismaService } from "../../infrastructure/database/prisma/prisma.service";
import { Transaction } from "../entities/transaction.entity";
import { TransferStatus } from "../entities/transaction-status.enum";
import { INotification } from "../interfaces/notification-service.interface";
import { IAuthorization } from "../interfaces/authorization.interface";

@Injectable()
export class TransferFundsUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository,
    private readonly transferRepository: TransactionRepository,
    private readonly prisma: PrismaService,
    private readonly transferDomainService: TransferDomainService,
    @Inject('IAuthorization') private readonly authorizationService : IAuthorization,
    @Inject('INotification') private readonly notificationService: INotification,
  ) {}

  async execute(createTransferDto: CreateTransferDto): Promise<void> {
    const { amount, payerId, payeeId } = createTransferDto;
    const payer = await this.userRepository.findById(payerId);
    const payeeUser = await this.userRepository.findById(payeeId);
    const payeeStore = await this.storeRepository.findById(payeeId);
    const money = new Money(amount);
    const payee = payeeUser || payeeStore;

    await this.prisma.$transaction(async (prisma) => {
      let transfer: Transaction;
      try {
            await this.authorizationService.authorize();

        const transfer = await this.transferDomainService.initiateTransfer(payer, payee, money);
        await this.transferRepository.save(transfer);

        const notificationMessage = `You have received a payment of ${amount} from ${payerId}`;
        await this.notificationService.notify(payee.email, notificationMessage);


      } catch (error) {
        if (transfer && transfer.status === TransferStatus.COMPLETED) {
          await this.transferDomainService.rollbackTransfer(payer, payee, money);
        }
        throw error;
      }
    });
  }
}
