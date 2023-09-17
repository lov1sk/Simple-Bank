import { ITransferRepository } from "../../repositories/TransferRepository/ITransferRepository";
import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { IMakeTransferRequestDTO } from "./MakeTransferDTO";

export class MakeTransferUseCase {
  constructor(
    private transferRepository: ITransferRepository,
    private userRepository: IUserRepository
  ) {}
  async execute(data: IMakeTransferRequestDTO) {
    // Verifica se o destinatario não é o mesmo
    if (data.sender_id === data.receiver_id) {
      throw new Error("cannot make a transfer to yourself");
    }

    // Verificar se o saldo da conta de envio é maior que o valor proposto
    const senderHaveBalance = await this.userRepository.verifyBalance({
      id: data.sender_id,
      valueToVerify: data.value,
    });

    if (senderHaveBalance == false) {
      throw new Error("Sender do not have enough balance");
    }
    const transfer = await this.transferRepository.makeTransfer(data);
    return transfer;
  }
}
