import {
  UserRegistrationData,
  UserData,
  UserLoginData,
} from "../../dto/user.dto";

export interface UserRepositoryContract {
  create(input: UserData): Promise<UserData>;
  getByEmail(email: string): Promise<UserData>;
}

export interface UserServiceContract {
  signup(input: UserRegistrationData): Promise<{ access_token: string }>;
  signin(input: UserLoginData): Promise<{ access_token: string }>;
}
