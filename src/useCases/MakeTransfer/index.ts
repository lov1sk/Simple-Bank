/*
    private transferRepository: ITransferRepository
    private userRepository: IUserRepository

    private checkAuthorizationUseCase: CheckAuthorizationUseCase,
    private makeTransferUseCase: MakeTransferUseCase,
    private updateBalanceUseCase: UpdateBalanceUseCase */

import { SQLiteUserRepository } from "../../repositories/UserRepository/implementations/SQLiteUserRepository";
import { SQLiteTransferRepository } from "../../repositories/TransferRepository/implementations/SQLiteTransferRepository";
import { UpdateBalanceUseCase } from "../UpdateBalance/UpdateBalanceUseCase";
import { CheckAuthorizationUseCase } from "../CheckAuthorization/CheckAuthorizationUseCase";
import { MakeTransferUseCase } from "./MakeTransferUseCase";
import { MakeTransferController } from "./MakeTransferController";

const transferRepository = new SQLiteTransferRepository();
const userRepository = new SQLiteUserRepository();

const checkAuthorizationUseCase = new CheckAuthorizationUseCase();
const updateBalanceUseCase = new UpdateBalanceUseCase(userRepository);
const makeTransferUseCase = new MakeTransferUseCase(
  transferRepository,
  userRepository
);

const makeTransferController = new MakeTransferController(
  checkAuthorizationUseCase,
  makeTransferUseCase,
  updateBalanceUseCase
);

export { makeTransferController };
