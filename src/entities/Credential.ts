export class Credential {
  public id?: string;
  public name: string;
  public number: bigint;
  constructor(props: Credential) {
    Object.assign(this, props);
  }
}
