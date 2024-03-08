import {
  UseDataResponse,
  UserContractInput,
  UserData,
  UserDataContract,
  AuthPayload,
} from "@/dto/user/user.dto";

export interface UserRepositoryContract {
  save(input: UserData): Promise<UserDataContract>;
  getByEmail(email: string): Promise<UserDataContract>;
}

export interface UserServiceContract {
  signup(input: UserContractInput): Promise<UseDataResponse>;
  authenticate(input: AuthPayload): Promise<{ access_token: string }>;
}
