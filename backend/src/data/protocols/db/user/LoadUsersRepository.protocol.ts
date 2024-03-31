import { UserModel } from "@/domain/models/User";

export interface LoadUsersRepository {
    loadAll(): Promise<UserModel[] | null>
}