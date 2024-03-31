import { UserModel } from "../../models/User";

export interface CreateUserModel {
    name: string;
    email: string;
    password: string;
    role: string
}

export interface CreateUser {
    create(input: CreateUserModel): Promise<UserModel>;
}
