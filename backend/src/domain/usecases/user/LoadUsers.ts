import { UserModel } from "@/domain/models/User";

export interface LoadUsers {
    loadAll(): Promise<UserModel[] | null>
}