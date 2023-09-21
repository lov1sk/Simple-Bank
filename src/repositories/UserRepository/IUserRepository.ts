import { User } from "../../entities/User";

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
export interface IUserRepository {
  saveUser(user: User): Promise<User>;
  increaseBalance({ newValue, id }: IncreaseBalanceEntries): Promise<void>;
  verifyBalance({ id, valueToVerify }: VerifyBalanceEntries): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User>;
  delete(id: string): Promise<void>;
  findUserTransactionsSent(id: string): Promise<UserTransactionsHistory>;
}
