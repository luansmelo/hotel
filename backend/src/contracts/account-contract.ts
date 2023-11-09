import { AccountDTO } from "../dto/account.dto";

export interface AccountRepositoryContract {
  save(input: AccountDTO): Promise<AccountDTO | null>;
  getByEmail(email: string): Promise<AccountDTO | null>;
}

export interface AccountServiceContract {
  create(input: AccountDTO): Promise<AccountDTO | null>;
  getByEmail(email: string): Promise<AccountDTO | null>;
}
