export class User {
  public id?: string;
  public name: string;
  public credentialId: string;
  public balance?: number;
  public email: string;
  public type: string;
  public password: string;
  public transfers_sent?: string[];
  public transfers_received?: string[];

  constructor(props: User) {
    Object.assign(this, props);
  }
}
