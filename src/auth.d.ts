import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: string;
      name: string;
    }; // user type is return type of `request.user` object
  }
}
