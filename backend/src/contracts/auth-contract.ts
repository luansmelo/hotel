import { AccountInputContract } from "../dto/account.dto";
import { AuthDTO, AuthToken } from "../dto/auth.dto";

export interface AuthRepositoryContract {
  signin(input: string): Promise<AccountInputContract>;
}

export interface AuthServiceContract {
  signin(input: AuthDTO): Promise<AuthToken>;
}
