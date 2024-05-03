import { MenuModel } from "@/domain/models/Menu";
import { FindMenuParams, FindMenuResponse } from "@/domain/usecases/menu/FindMenuParams";

export interface LoadMenusRepository {
    loadAll(findParams: FindMenuParams): Promise<FindMenuResponse>
}