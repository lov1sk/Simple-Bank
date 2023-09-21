import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { IFindTransactionsSentRequest } from "./FindTransactionsSentDTO";

export class FindTransactionsSentUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: IFindTransactionsSentRequest) {
    const user = await this.userRepository.findUserTransactionsSent(data.id);
    if (user.transfers_sent.length === 0) {
      throw new Error("No transactions made yet");
    }

    return user;
  }
}
