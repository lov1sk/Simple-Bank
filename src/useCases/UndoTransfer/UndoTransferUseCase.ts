import { ITransferRepository } from "../../repositories/TransferRepository/ITransferRepository";
import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { UndoTransferRequestDTO } from "./UndoTransferDTO";

export class UndoTransferUseCase {
  constructor(
    private transferRepository: ITransferRepository,
    private userRepository: IUserRepository
  ) {}
  async execute(data: UndoTransferRequestDTO) {
    const transferExists = await this.transferRepository.findTransfer(data.id);

    if (!transferExists) {
      throw new Error("The transference register was not found");
    }

    const { value, sender_id, receiver_id } = transferExists;
    await this.transferRepository.undoTransfer(data.id);

    return { value, sender_id, receiver_id };
  }
}
