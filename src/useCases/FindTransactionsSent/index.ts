import { SQLiteUserRepository } from "../../repositories/UserRepository/implementations/SQLiteUserRepository";
import { FindTransactionsSentController } from "./FindTransactionsSentController";
import { FindTransactionsSentUseCase } from "./FindTransactionsSentUseCase";

const userRepository = new SQLiteUserRepository();
const findTransactionsSentUseCase = new FindTransactionsSentUseCase(
  userRepository
);
const findTransactionsSentController = new FindTransactionsSentController(
  findTransactionsSentUseCase
);

export { findTransactionsSentController };
