import { Account } from "../entities/account";

export interface AccountUseCases {
  create(input: CreateAccountInput): Promise<Account>;
  getByID(input: string): Promise<Account>;
}

export interface CreateAccountInput {
  name: string;
  email: string;
  password: string;
}
