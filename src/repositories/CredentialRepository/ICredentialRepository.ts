import { Credential } from "../../entities/Credential";

type CredentialRepositoryEntries = {
  credentialNumber: bigint;
  credentialName: string;
};

export interface ICredentialRepository {
  saveCredential(
    entries: CredentialRepositoryEntries
  ): Promise<Credential | null>;
  findByCredentialNumber(credentialNumber: bigint): Promise<Credential | null>;
  delete(id: string): Promise<void>;
}
