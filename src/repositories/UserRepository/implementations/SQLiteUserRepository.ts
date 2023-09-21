import { User } from "../../../entities/User";
import { Credential } from "../../../entities/Credential";
import { prisma } from "../../../lib/prisma";
import { IUserRepository } from "../IUserRepository";

type IncreaseBalanceEntries = {
  newValue: number;
  id: string;
};
type VerifyBalanceEntries = {
  valueToVerify: number;
  id: string;
};
type UserTransactionsHistory = {
  id: string;
  name: string;
  email: string;
  credentialId: string;
  transfers_sent: {
    id: string;
    created_at: Date;
    value: number;
    receiver: {
      id: string;
      name: string;
    };
  }[];
};

export class SQLiteUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    console.log("Aqui");

    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }
  async findByCredentialNumber(number: bigint): Promise<Credential | null> {
    const credential = await prisma.credential.findUnique({
      where: { number },
    });
    return credential;
  }
  async saveCredential(
    credentialNumber: bigint,
    credentialName: string
  ): Promise<Credential> {
    const credentialCreated = await prisma.credential.create({
      data: { name: credentialName, number: credentialNumber },
    });
    return credentialCreated;
  }
  async increaseBalance({
    newValue,
    id,
  }: IncreaseBalanceEntries): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { balance: newValue },
    });
  }
  async verifyBalance({
    valueToVerify,
    id,
  }: VerifyBalanceEntries): Promise<boolean> {
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });

    if (user.balance < valueToVerify) {
      return false;
    }

    return true;
  }
  async findUserTransactionsSent(id: string): Promise<UserTransactionsHistory> {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        credentialId: true,
        transfers_sent: {
          select: {
            id: true,
            created_at: true,
            value: true,
            receiver: { select: { id: true, name: true } },
          },
        },
      },
    });
    return user;
  }
  async saveUser(user: User): Promise<User> {
    const { name, email, password, type, credentialId, balance } = user;
    return await prisma.user.create({
      data: {
        name,
        email,
        credentialId,
        balance,
        password,
        type,
      },
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });
    return user;
  }
}
