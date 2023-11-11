import { AccountContract, AccountInputContract } from "../dto/account.dto";

export interface AccountRepositoryContract {
  save(input: AccountInputContract): Promise<AccountContract>;
  getByEmail(email: string): Promise<AccountInputContract>;
}

export interface AccountServiceContract {
  create(input: AccountInputContract): Promise<{ access_token: string }>;
  getByEmail(email: string): Promise<AccountInputContract>;
}
