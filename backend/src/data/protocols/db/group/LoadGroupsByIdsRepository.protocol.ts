import { GroupModel } from "@/domain/models/Group";

export interface LoadGroupsByIdsRepository {
    findByIds(id: string[]): Promise<GroupModel[] | null>;
}