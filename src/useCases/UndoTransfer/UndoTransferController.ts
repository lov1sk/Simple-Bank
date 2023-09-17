import { FastifyRequest, FastifyReply } from "fastify";
import { CheckAuthorizationUseCase } from "../CheckAuthorization/CheckAuthorizationUseCase";
import { UndoTransferRequestDTO } from "./UndoTransferDTO";
import { UndoTransferUseCase } from "./UndoTransferUseCase";
import { UpdateBalanceUseCase } from "../UpdateBalance/UpdateBalanceUseCase";

type UndoTransferRequest = {
  id: string;
};

export class UndoTransferController {
  constructor(
    private checkAuthorizationUseCase: CheckAuthorizationUseCase,
    private undoTransferUseCase: UndoTransferUseCase,
    private updateBalanceUseCase: UpdateBalanceUseCase
  ) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { id } = request.body as UndoTransferRequest;

    try {
      // Verificar a autorização do mock
      const canMakeTransfer = await this.checkAuthorizationUseCase.execute();

      if (!canMakeTransfer) {
        throw new Error("Not Authorized to undid transfers");
      }

      // Computando no banco de dados
      const undidTransfer = await this.undoTransferUseCase.execute({ id });
      // Achar no banco de dados o id informado para o sender
      // Com um if, criar ou um client ou error
      // Atualizar o saldo do sender, acrescentando novamente o valor
      await this.updateBalanceUseCase.execute({
        id: undidTransfer.sender_id,
        value: undidTransfer.value,
      });

      // Achar no banco de dados o id informado para o receiver
      // Com um if, criar ou um client ou dealer
      // Atualizar o saldo do receiver, subtraindo novamente o valor
      await this.updateBalanceUseCase.execute({
        id: undidTransfer.receiver_id,
        value: -undidTransfer.value,
      });
      return reply.status(201).send({ message: "Success" });
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
