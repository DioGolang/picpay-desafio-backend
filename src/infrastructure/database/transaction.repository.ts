import { Injectable } from "@nestjs/common";
import { ITransferRepository } from "../../@core/interfaces/transaction-repository.interface";
import { Transaction } from "src/@core/entities/transaction.entity";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class TransactionRepository implements ITransferRepository {

  constructor(private prisma: PrismaService) { }

  private mapToTransaction(transaction: any): Transaction{
    return new Transaction(
      transaction.id,
      transaction.amount,
      transaction.payer,
      transaction.payee,
      transaction.status
    )
  }

   async findById(id: string): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findUnique({where: {id}});
    return this.mapToTransaction(transaction);
    }

  async save(entity: Transaction): Promise<void> {

    await this.prisma.transaction.create({
      data: {
        amount: entity.amount.value,
        payerId: entity.payer.id,
        payeeId: entity.payee.id,
        status: entity.status
      }
    });
  }

   async update(entity: Transaction): Promise<void> {
      await this.prisma.transaction.update({
          where: {id: entity.id},
          data: {
            amount : entity.amount.value,
            payerId: entity.payer.id,
            payeeId: entity.payee.id,
            status: entity.status
          }
        })
    }

   async delete(id: string): Promise<void> {
      await this.prisma.transaction.delete({ where: { id } }) }
}