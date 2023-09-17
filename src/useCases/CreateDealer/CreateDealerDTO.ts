export interface ICreateDealerRequestDTO {
  id?: string;
  name: string;
  credentialId: string;
  balance?: number;
  email: string;
  type: "Dealer";
  password: string;
  transfers_received?: string[];
}
