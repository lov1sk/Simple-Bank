import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { IMakeDepositRequestDTO } from "./MakeDepositDTO";

export class MakeDepositUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IMakeDepositRequestDTO) {
    // pegar um valor e aumentar o saldo do usuario
    await this.userRepository.increaseBalance({
      id: data.id,
      newValue: data.value,
    });
  }
}
