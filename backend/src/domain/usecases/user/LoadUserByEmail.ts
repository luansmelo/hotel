import { UserModel } from "@/domain/models/User";

export interface LoadUserByEmail {
    loadByEmail(email: string): Promise<UserModel | null>
}