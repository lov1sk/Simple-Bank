import { User } from "../../../entities/User";
import { Credential } from "../../../entities/Credential";
import { prisma } from "../../../lib/prisma";
import { ICredentialRepository } from "../ICredentialRepository";

type CredentialRepositoryEntries = {
  credentialNumber: bigint;
  credentialName: string;
};

export class SQLiteCredentialRepository implements ICredentialRepository {
  async findByCredentialNumber(number: bigint): Promise<Credential | null> {
    const credential = await prisma.credential.findUnique({
      where: { number },
    });
    return credential;
  }
  async saveCredential({
    credentialName,
    credentialNumber,
  }: CredentialRepositoryEntries): Promise<Credential> {
    const credentialCreated = await prisma.credential.create({
      data: { name: credentialName, number: credentialNumber },
    });
    return credentialCreated;
  }
  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
