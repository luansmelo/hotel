import { UserModel } from "@/domain/models/User";

export interface LoadUserByEmailRepository {
    loadByEmail(email: string): Promise<UserModel | null>
}