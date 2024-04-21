import { UserModel } from "@/domain/models/User";

export interface LoadUserByIdRepository {
    loadById(id: string): Promise<UserModel | null>
}