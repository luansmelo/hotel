import { AccountContract } from "../domain/account";

export abstract class AccountRepository {
  abstract create(input: CreateAccountInputRepo): Promise<AccountContract>;
  abstract getByID(input: string): Promise<AccountContract>;
}

export type CreateAccountInputRepo = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};
