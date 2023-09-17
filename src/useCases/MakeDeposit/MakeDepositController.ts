import { FastifyReply, FastifyRequest } from "fastify";
import { MakeDepositUseCase } from "./MakeDepositUseCase";

type MakeDepositRequest = {
  id: string;
  value: number;
};

export class MakeDepositController {
  constructor(private makeDepositUseCase: MakeDepositUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id, value } = request.body as MakeDepositRequest;

    try {
      await this.makeDepositUseCase.execute({ id, value });
      return reply
        .status(200)
        .send({ message: "Deposit was successfully created" });
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
