import { UserModel } from "@/domain/models/User";
import { CreateAuthModel } from "@/entities/auth/auth";

export interface CreateAuth {
  authenticate(input: CreateAuthModel): Promise<UserModel | null>;
}
