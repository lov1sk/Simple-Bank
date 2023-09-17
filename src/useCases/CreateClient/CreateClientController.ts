import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { CreateClientUseCase } from "./CreateClientUseCase";
import { CreateCredentialUseCase } from "../CreateCredential/CreateCredentialUseCase";
import { User } from "../../entities/User";

type CreateClientRequest = {
  name: string;
  email: string;
  password: string;
  cpf: bigint;
  balance?: number;
  type: "Client";
};

export class CreateClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private createCredentialUseCase: CreateCredentialUseCase
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    const { name, email, password, cpf, balance } =
      request.body as CreateClientRequest;
    const credential = await this.createCredentialUseCase.execute({
      name: "CPF",
      number: cpf,
    });
    const clientCreated = await this.createClientUseCase.execute({
      name,
      email,
      password,
      balance,
      credentialId: credential?.id!,
      type: "Client",
    });
    return clientCreated;
  }
}
