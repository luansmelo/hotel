import { UserModel } from "@/domain/models/User";

export interface FindUserByEmailContract {
  findByEmail(email: string): Promise<UserModel | null>;
}

export interface FindUserByEmail {
  findByEmail(email: string): Promise<UserModel | null>;
}
