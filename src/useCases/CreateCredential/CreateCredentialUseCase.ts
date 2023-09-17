import { ICredentialRepository } from "../../repositories/CredentialRepository/ICredentialRepository";
import { ICreateCredentialRequestDTO } from "./CreateCredentialDTO";

export class CreateCredentialUseCase {
  constructor(private credentialRepository: ICredentialRepository) {}
  async execute(data: ICreateCredentialRequestDTO) {
    const credentialExists =
      await this.credentialRepository.findByCredentialNumber(data.number);

    if (credentialExists) {
      throw new Error("user credential already exists");
    }
    const credential = await this.credentialRepository.saveCredential({
      credentialName: data.name,
      credentialNumber: data.number,
    });

    return credential;
  }
}
