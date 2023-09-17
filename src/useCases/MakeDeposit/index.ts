import { SQLiteUserRepository } from "../../repositories/UserRepository/implementations/SQLiteUserRepository";
import { MakeDepositController } from "./MakeDepositController";
import { MakeDepositUseCase } from "./MakeDepositUseCase";

const userRepository = new SQLiteUserRepository();
const makeDepositUseCase = new MakeDepositUseCase(userRepository);

const makeDepositController = new MakeDepositController(makeDepositUseCase);

export { makeDepositController };
