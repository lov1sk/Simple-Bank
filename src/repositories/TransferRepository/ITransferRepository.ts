import { Transfer } from "../../entities/Transfer";

type TransferRepositoryEntries = {
  value: number;
  sender_id: string;
  receiver_id: string;
};

export interface ITransferRepository {
  makeTransfer({
    value,
    sender_id,
    receiver_id,
  }: TransferRepositoryEntries): Promise<void>;
  undoTransfer(id: string): Promise<void>;
  findTransfer(id: string): Promise<Transfer>;
}
