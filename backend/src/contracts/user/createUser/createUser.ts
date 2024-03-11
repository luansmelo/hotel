import { CreateUserModel } from "@/entities/user/createUser";

export interface UserModel {
  id?: string;
  name: string;
  email: string;
  role: string;
  isAuthorized: string;
  access_token: string;
}

export interface CreateUserContract {
  save(input: CreateUserModel): Promise<UserModel>;
}

export interface CreateUser {
  create(input: CreateUserModel): Promise<UserModel>;
}
