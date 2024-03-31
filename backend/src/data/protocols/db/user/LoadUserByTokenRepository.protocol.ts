import { UserModel } from "@/domain/models/User";

export interface LoadUserByTokenRepository {
    loadByIdAndRole(token: string, role?: string): Promise<UserModel | null>;
  }