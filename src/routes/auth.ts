import { FastifyInstance } from "fastify";
import { createClientController } from "../useCases/CreateClient/index";
import { createDealerController } from "../useCases/CreateDealer/index";
import { loginController } from "../useCases/Login";

export async function authRoutes(app: FastifyInstance) {
  // Criação de um novo Usuario
  app.post("/register/client", async (request, reply) => {
    try {
      const response = await createClientController.handle(request, reply);
      return reply.status(201).send({
        user: response,
        token: app.jwt.sign(
          {
            // Colocar aqui apenas informações publicas, no caso as que serão mostradas na interface
            name: response.name,
          },
          {
            /* Colocar em sub informações unicas como o ID e tempo de expiração, todas as informações 
        Todas as informações permitentes a nossa aplicação que são sensiveis, colocar aqui */

            sub: response.id,
            expiresIn: "1 days",
          }
        ),
      });
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  });
  app.post("/register/dealer", async (request, reply) => {
    try {
      const response = await createDealerController.handle(request, reply);
      return reply.status(201).send({
        user: response,
        token: app.jwt.sign(
          {
            // Colocar aqui apenas informações publicas, no caso as que serão mostradas na interface
            name: response.name,
          },
          {
            /* Colocar em sub informações unicas como o ID e tempo de expiração, todas as informações 
      Todas as informações permitentes a nossa aplicação que são sensiveis, colocar aqui */

            sub: response.id,
            expiresIn: "1 days",
          }
        ),
      });
    } catch (error) {
      reply.status(400).send({ message: error.message });
    }
  });
  app.post("/login", async (request, reply) => {
    try {
      const response = await loginController.handle(request, reply);
      return reply.status(200).send({
        user: response,
        token: app.jwt.sign(
          {
            // Colocar aqui apenas informações publicas, no caso as que serão mostradas na interface
            name: response.name,
          },
          {
            /* Colocar em sub informações unicas como o ID e tempo de expiração, todas as informações 
    Todas as informações permitentes a nossa aplicação que são sensiveis, colocar aqui */

            sub: response.id,
            expiresIn: "1 days",
          }
        ),
      });
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  });
}
