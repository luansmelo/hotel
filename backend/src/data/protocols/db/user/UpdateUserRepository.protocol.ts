import { UserModel } from "@/domain/models/User";
import { CreateUserModel } from "@/domain/usecases/user/CreateUser";

export interface UpdateUserRepository {
    updateById(id: string, data: Partial<CreateUserModel>): Promise<Partial<UserModel>>
}