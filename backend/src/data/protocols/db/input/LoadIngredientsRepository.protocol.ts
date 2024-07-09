import { FindInputsParams, FindInputsResponse } from "@/domain/usecases/input/FindInputsParams";

export interface LoadInputsRepository {
    loadAll(params: FindInputsParams): Promise<FindInputsResponse>
}