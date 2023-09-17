import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUseCase } from "./LoginUseCase";
import { User } from "../../entities/User";

type LoginEntries = {
  email: string;
  password: string;
};

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    const { email, password } = request.body as LoginEntries;
    const { user } = await this.loginUseCase.execute({ email, password });
    return user;
  }
}
