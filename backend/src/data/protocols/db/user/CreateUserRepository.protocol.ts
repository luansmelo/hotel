import { CreateUserModel } from "@/domain/entities/CreateUser";
import { UserModel } from "@/domain/models/User";

export interface CreateUserRepository {
    create(input: CreateUserModel): Promise<UserModel>;
}