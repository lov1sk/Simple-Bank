export class Transfer {
  public id?: string;
  public created_at?: Date;
  public value: number;
  public sender_id: string;
  public receiver_id: string;

  constructor(props: Transfer) {
    Object.assign(this, props);
  }
}
