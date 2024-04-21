import { UserModel } from "@/domain/models/User";

export interface DeleteUserRepository {
    deleteById(id: string): Promise<UserModel>;
}