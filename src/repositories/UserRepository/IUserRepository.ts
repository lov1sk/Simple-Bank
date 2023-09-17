import { User } from "../../entities/User";

type IncreaseBalanceEntries = {
  newValue: number;
  id: string;
};
type VerifyBalanceEntries = {
  valueToVerify: number;
  id: string;
};
export interface IUserRepository {
  saveUser(user: User): Promise<User>;
  increaseBalance({ newValue, id }: IncreaseBalanceEntries): Promise<void>;
  verifyBalance({ id, valueToVerify }: VerifyBalanceEntries): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User>;
  delete(id: string): Promise<void>;
}
