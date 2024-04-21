import { UserModel } from "@/domain/models/User";

export interface DeleteUserUseCaseContract {
    deleteById(id: string): Promise<UserModel>;
}