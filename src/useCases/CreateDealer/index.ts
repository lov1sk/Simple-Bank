import { SQLiteCredentialRepository } from "../../repositories/CredentialRepository/implementations/SQLiteCredentialRepository";
import { SQLiteUserRepository } from "../../repositories/UserRepository/implementations/SQLiteUserRepository";
import { CreateCredentialUseCase } from "../CreateCredential/CreateCredentialUseCase";
import { CreateDealerController } from "./CreateDealerController";
import { CreateDealerUseCase } from "./CreateDealerUseCase";

const userRepository = new SQLiteUserRepository();
const credentialRepository = new SQLiteCredentialRepository();
const createDealerUseCase = new CreateDealerUseCase(userRepository);
const createCredentialUseCase = new CreateCredentialUseCase(
  credentialRepository
);
const createDealerController = new CreateDealerController(
  createDealerUseCase,
  createCredentialUseCase
);

export { createDealerController };
