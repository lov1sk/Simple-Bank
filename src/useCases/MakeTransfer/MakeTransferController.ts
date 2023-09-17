import { FastifyRequest, FastifyReply } from "fastify";
import { CheckAuthorizationUseCase } from "../CheckAuthorization/CheckAuthorizationUseCase";
import { MakeTransferUseCase } from "./MakeTransferUseCase";
import { UpdateBalanceUseCase } from "../UpdateBalance/UpdateBalanceUseCase";

type MakeTransferRequest = {
  value: number;
  sender_id: string;
  receiver_id: string;
};

export class MakeTransferController {
  constructor(
    private checkAuthorizationUseCase: CheckAuthorizationUseCase,
    private makeTransferUseCase: MakeTransferUseCase,
    private updateBalanceUseCase: UpdateBalanceUseCase
  ) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { value, receiver_id, sender_id } =
      request.body as MakeTransferRequest;

    try {
      // Verificar a autorização do mock
      const canMakeTransfer = await this.checkAuthorizationUseCase.execute();

      if (!canMakeTransfer) {
        throw new Error("Not Authorized do make transfers");
      }

      // Computando no banco de dados
      await this.makeTransferUseCase.execute({ sender_id, receiver_id, value });
      // Achar no banco de dados o id informado para o sender
      // Com um if, criar ou um client ou error
      // Atualizar o saldo do sender, subtraindo o valor
      await this.updateBalanceUseCase.execute({ id: sender_id, value: -value });

      // Achar no banco de dados o id informado para o receiver
      // Com um if, criar ou um client ou dealer
      // Atualizar o saldo do receiver, acrescentando o valor
      await this.updateBalanceUseCase.execute({
        id: receiver_id,
        value,
      });
      return reply.status(201).send({ message: "Success " });
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
