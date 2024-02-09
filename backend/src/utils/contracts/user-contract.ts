import {
  UseDataResponse,
  UserContractInput,
  UserData,
  UserDataContract,
  UserLoginInput,
} from "../../dto/user.dto";

export interface UserRepositoryContract {
  save(input: UserData): Promise<UserDataContract>;
  getByEmail(email: string): Promise<UserDataContract>;
}

export interface UserServiceContract {
  signup(input: UserContractInput): Promise<UseDataResponse>;
  signin(input: UserLoginInput): Promise<{ access_token: string }>;
}
