import { UserModel } from "@/domain/models/User";

export interface FindUserByTokenContract {
  findByIdAndRole(token: string, role?: string): Promise<UserModel | null>;
}

export interface FindUserByToken {
  findByToken(token: string, role?: string): Promise<UserModel | null>;
}
