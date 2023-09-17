import { FastifyReply, FastifyRequest } from "fastify";
import { CreateDealerUseCase } from "./CreateDealerUseCase";
import { CreateCredentialUseCase } from "../CreateCredential/CreateCredentialUseCase";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";

type CreateDealerRequest = {
  name: string;
  email: string;
  password: string;
  balance?: number;
  cnpj: bigint;
  type: "Dealer";
};

export class CreateDealerController {
  constructor(
    private createDealerUseCase: CreateDealerUseCase,
    private createCredentialUseCase: CreateCredentialUseCase
  ) {}
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    const { name, email, cnpj, password, balance } =
      request.body as CreateDealerRequest;

    const credential = await this.createCredentialUseCase.execute({
      name: "CNPJ",
      number: cnpj,
    });
    // encriptografar a senha e salvar esse has no banco de dados
    const hash = await bcrypt.hash(password, 10);
    const dealerCreated = await this.createDealerUseCase.execute({
      name,
      email,
      password: hash,
      balance,
      credentialId: credential?.id!,
      type: "Dealer",
    });
    return dealerCreated;
  }
}
