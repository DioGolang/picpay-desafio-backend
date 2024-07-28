import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from '../repositories/user.repository';
import { IStoreRepository } from '../repositories/store.repository';
import { CreateTransferDto } from '../../modules/transfer/dto/create-transfer.dto';
import { Money } from "../value-objects/money.vo";
import { TransactionRepository } from "../../infrastructure/database/transaction.repository";
import { TransferDomainService } from "../services/transfer-domain/transfer-domain.service";
import { AuthorizationService } from "../../infrastructure/external/authorization/authorization.service";
import { NotificationService } from "../../infrastructure/external/notification/notification.service";
import { PrismaService } from "../../infrastructure/database/prisma/prisma.service";

@Injectable()
export class TransferFundsUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IStoreRepository') private readonly storeRepository: IStoreRepository,
    private readonly transferRepository: TransactionRepository,
    private readonly prisma: PrismaService,
    private readonly transferDomainService: TransferDomainService,
    private readonly authorizationService: AuthorizationService,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(createTransferDto: CreateTransferDto): Promise<void> {
    const { amount, payerId, payeeId } = createTransferDto;
    const payer = await this.userRepository.findById(payerId);
    const payeeUser = await this.userRepository.findById(payeeId);
    const payeeStore = await this.storeRepository.findById(payeeId);
    const money = new Money(amount);

     const payee = payeeUser || payeeStore;

    if (!payer || !payee) {
      throw new Error('Invalid transaction');
    }

    if (payer.balance.value < money.value) {
      throw new Error('Insufficient balance');
    }

    await this.prisma.$transaction(async (prisma) => {
      try {
        // const isAuthorized = await this.authorizationService.authorize();
        // if (!isAuthorized) {
        //   throw new Error('Transaction not authorized');
        // }

        const transfer = await this.transferDomainService.initiateTransfer(payer, payee, money);
        await this.transferRepository.save(transfer);

        const notificationMessage = `You have received a payment of ${amount} from ${payerId}`;
        const isNotified = await this.notificationService.notify(payee.email, notificationMessage);
        if (!isNotified) {
          console.warn('Notification failed, but transaction will proceed');
        }

      } catch (error) {
        await this.transferDomainService.rollbackTransfer(payer, payee, money);
        throw error;
      }
    });
  }
}