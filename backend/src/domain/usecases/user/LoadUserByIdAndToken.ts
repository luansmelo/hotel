import { UserModel } from "@/domain/models/User";

export interface FindUserByToken {
    findByToken(token: string, role?: string): Promise<UserModel | null>;
  }