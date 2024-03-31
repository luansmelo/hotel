import { UserModel } from "@/domain/models/User";
import { CreateUserModel } from "@/domain/usecases/user/CreateUser";

export interface CreateUserRepository {
    create(input: CreateUserModel): Promise<UserModel>;
}