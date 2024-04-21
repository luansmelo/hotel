import { UserModel } from "@/domain/models/User";
import { CreateUserModel } from "./CreateUser";

export interface UpdateUserUseCaseContract {
    updateById(id: string, input: Partial<CreateUserModel>): Promise<Partial<UserModel | null>>;
}