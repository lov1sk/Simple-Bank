import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { IUpdateBalanceRequestDTO } from "./UpdateBalanceDTO";

export class UpdateBalanceUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute({ id, value }: IUpdateBalanceRequestDTO) {
    const user = await this.userRepository.findById(id);

    if (!user.balance) {
      throw new Error("Error with balance");
    }

    const newUserBalance = user.balance + value;

    await this.userRepository.increaseBalance({
      newValue: newUserBalance,
      id: user.id!,
    });
  }
}
