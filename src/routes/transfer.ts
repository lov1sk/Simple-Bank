import { FastifyInstance } from "fastify";
import { makeTransferController } from "../useCases/MakeTransfer";
import { makeDepositController } from "../useCases/MakeDeposit";
import { undoTransferController } from "../useCases/UndoTransfer";

export async function transferRoutes(app: FastifyInstance) {
  // Criação de um novo Usuario
  app.post("/new/transfer", async (request, reply) => {
    return makeTransferController.handle(request, reply);
  });
  app.post("/new/deposit", async (request, reply) => {
    return makeDepositController.handle(request, reply);
  });
  app.post("/undo/transfer", async (request, reply) => {
    return undoTransferController.handle(request, reply);
  });
}
