export interface IMakeTransferRequestDTO {
  id?: string;
  created_at?: Date;
  value: number;
  sender_id: string;
  receiver_id: string;
}
