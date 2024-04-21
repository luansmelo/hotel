import { FindUsersParams, FindUsersResponse } from "./FindUsersParams";

export interface LoadUsers {
    loadAll(params: FindUsersParams): Promise<FindUsersResponse>
}