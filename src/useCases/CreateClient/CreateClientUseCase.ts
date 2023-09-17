import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { ICreateClientRequestDTO } from "./CreateClientDTO";

export class CreateClientUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: ICreateClientRequestDTO) {
    const userEmailExists = await this.userRepository.findByEmail(data.email);
    if (userEmailExists) {
      throw new Error("user already exists");
    }
    const user = await this.userRepository.saveUser(data);
    return user;
  }
}
