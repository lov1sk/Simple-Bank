import { FastifyReply, FastifyRequest } from "fastify";
import { FindTransactionsSentUseCase } from "./FindTransactionsSentUseCase";

type FindTransactionsSentRequest = {
  id: string;
};
export class FindTransactionsSentController {
  constructor(
    private findTransactionsSentUseCase: FindTransactionsSentUseCase
  ) {}
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as FindTransactionsSentRequest;
    try {
      const user = await this.findTransactionsSentUseCase.execute({ id });
      return reply.status(200).send(user);
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
