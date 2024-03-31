import { GroupModel } from "@/domain/models/Group";

export interface LoadGroupByNameRepository {
    loadByName(string: string): Promise<GroupModel | null>
}