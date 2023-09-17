import { SQLiteCredentialRepository } from "../../repositories/CredentialRepository/implementations/SQLiteCredentialRepository";
import { SQLiteUserRepository } from "../../repositories/UserRepository/implementations/SQLiteUserRepository";
import { CreateCredentialUseCase } from "../CreateCredential/CreateCredentialUseCase";
import { CreateClientController } from "./CreateClientController";
import { CreateClientUseCase } from "./CreateClientUseCase";

const userRepository = new SQLiteUserRepository();
const credentialRepository = new SQLiteCredentialRepository();

const createClientUseCase = new CreateClientUseCase(userRepository);
const createCredentialUseCase = new CreateCredentialUseCase(
  credentialRepository
);
const createClientController = new CreateClientController(
  createClientUseCase,
  createCredentialUseCase
);

export { createClientController, createClientUseCase };
