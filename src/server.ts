import fastify from "fastify";
import jwt from "@fastify/jwt";
import { authRoutes } from "./routes/auth";
import { transferRoutes } from "./routes/transfer";

const app = fastify();
app.register(authRoutes);
app.register(transferRoutes);
app.register(jwt, {
  secret: "Pic-Pay",
});
app
  .listen({ port: 3333 })
  .then(() => console.log("Server is running at :3333"));
