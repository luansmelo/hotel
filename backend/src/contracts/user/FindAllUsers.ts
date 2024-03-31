import { UserModel } from "@/domain/models/User";

export interface FindUsersContract {
  findUsers(): Promise<UserModel[] | null>;
}

export interface FindUsers {
  findUsers(): Promise<UserModel[] | null>;
}
