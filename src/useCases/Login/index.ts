import { SQLiteUserRepository } from "../../repositories/UserRepository/implementations/SQLiteUserRepository";
import { LoginController } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";

const userRepository = new SQLiteUserRepository();
const loginUseCase = new LoginUseCase(userRepository);

const loginController = new LoginController(loginUseCase);

export { loginController };
