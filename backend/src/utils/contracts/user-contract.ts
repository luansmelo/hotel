import { UserContractInput, UserData, UserLoginInput } from "../../dto/user.dto";

export interface UserRepositoryContract {
  save(input: UserData): Promise<UserData>;
  getByEmail(email: string): Promise<UserData>;
}

export interface UserServiceContract {
  signup(input: UserContractInput): Promise<{ access_token: string }>;
  signin(input: UserLoginInput): Promise<{ access_token: string }>;
}
