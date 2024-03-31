import { GroupModel } from "@/domain/models/Group";

export interface LoadGroupByIdRepository {
    loadById(string: string): Promise<GroupModel | null>
}