import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/UserRepository/IUserRepository";
import { LoginRequestDTO } from "./LoginDTO";
import bcrypt from "bcrypt";

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: LoginRequestDTO) {
    const user = (await this.userRepository.findByEmail(data.email)) as User;

    if (!user) {
      throw new Error("Email invalid");
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new Error("Password invalid");
    }

    return { user };
  }
}
