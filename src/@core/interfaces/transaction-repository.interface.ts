import { Transaction } from "../entities/transaction.entity";
import { CreateTransferDto } from "../../modules/transfer/dto/create-transfer.dto";


export interface ITransferRepository {
  findById(id: string): Promise<Transaction>;
  save(entity: Transaction): Promise<void>;
  update(entity: Transaction): Promise<void>;
  delete(id: string): Promise<void>;
}
