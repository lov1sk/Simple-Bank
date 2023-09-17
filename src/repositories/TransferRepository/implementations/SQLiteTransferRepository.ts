import { Transfer } from "../../../entities/Transfer";
import { prisma } from "../../../lib/prisma";
import { ITransferRepository } from "../ITransferRepository";

type TransferRepositoryEntries = {
  value: number;
  sender_id: string;
  receiver_id: string;
};

export class SQLiteTransferRepository implements ITransferRepository {
  async makeTransfer({
    value,
    sender_id,
    receiver_id,
  }: TransferRepositoryEntries): Promise<void> {
    // Fazer a transferencia
    await prisma.transfer.create({ data: { value, receiver_id, sender_id } });
  }
  async undoTransfer(id: string): Promise<void> {
    await prisma.transfer.delete({
      where: { id },
    });
  }
  async findTransfer(id: string): Promise<Transfer> {
    return await prisma.transfer.findUniqueOrThrow({ where: { id } });
  }
}
