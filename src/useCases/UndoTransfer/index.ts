import { SQLiteTransferRepository } from "../../repositories/TransferRepository/implementations/SQLiteTransferRepository";
import { SQLiteUserRepository } from "../../repositories/UserRepository/implementations/SQLiteUserRepository";
import { CheckAuthorizationUseCase } from "../CheckAuthorization/CheckAuthorizationUseCase";
import { UpdateBalanceUseCase } from "../UpdateBalance/UpdateBalanceUseCase";
import { UndoTransferController } from "./UndoTransferController";
import { UndoTransferUseCase } from "./UndoTransferUseCase";

const userRepository = new SQLiteUserRepository();
const transferRepository = new SQLiteTransferRepository();

const checkAuthorizationUseCase = new CheckAuthorizationUseCase();
const updateBalanceUseCase = new UpdateBalanceUseCase(userRepository);
const undoTransferUseCase = new UndoTransferUseCase(
  transferRepository,
  userRepository
);

const undoTransferController = new UndoTransferController(
  checkAuthorizationUseCase,
  undoTransferUseCase,
  updateBalanceUseCase
);

export { undoTransferController };
