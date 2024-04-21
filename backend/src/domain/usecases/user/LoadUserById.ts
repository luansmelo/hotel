import { UserModel } from "@/domain/models/User";

export interface LoadUserByIdUseCaseContract {
    loadById(id: string): Promise<UserModel | null>
}