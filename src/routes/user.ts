import { FastifyInstance } from "fastify";
import { findTransactionsSentController } from "../useCases/FindTransactionsSent";

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });
  // Criação de um novo Usuario
  app.get("/transfers/:id", async (request, reply) => {
    return findTransactionsSentController.handle(request, reply);
  });
}
