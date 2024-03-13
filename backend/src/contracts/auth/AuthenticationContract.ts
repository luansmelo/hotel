import { UserModel } from "../user";
import { CreateAuthModel } from "@/entities/auth/auth";

export interface CreateAuth {
  authenticate(input: CreateAuthModel): Promise<UserModel | null>;
}
