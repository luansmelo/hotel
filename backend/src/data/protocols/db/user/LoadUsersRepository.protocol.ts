import { FindUsersParams, FindUsersResponse } from "@/domain/usecases/user/FindUsersParams";

export interface LoadUsersRepository {
    loadAll(params: FindUsersParams): Promise<FindUsersResponse>
}