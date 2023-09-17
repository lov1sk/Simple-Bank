import { ICredentialRepository } from "../../repositories/CredentialRepository/ICredentialRepository";
import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { ICreateDealerRequestDTO } from "./CreateDealerDTO";

export class CreateDealerUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateDealerRequestDTO) {
    const dealerAlreadyExists = await this.userRepository.findByEmail(
      data.email
    );
    if (dealerAlreadyExists) {
      throw new Error("Dealer already exists");
    }

    return await this.userRepository.saveUser(data);
  }
}
