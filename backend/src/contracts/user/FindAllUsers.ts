import { UserModel } from "./CreateUserContract";

export interface FindUsersContract {
  findUsers(): Promise<UserModel[] | null>;
}

export interface FindUsers {
  findUsers(): Promise<UserModel[] | null>;
}
