export interface ICreateClientRequestDTO {
  id?: string;
  name: string;
  credentialId: string;
  balance?: number;
  email: string;
  type: "Client";
  password: string;
  transfers_sent?: string[];
  transfers_received?: string[];
}
