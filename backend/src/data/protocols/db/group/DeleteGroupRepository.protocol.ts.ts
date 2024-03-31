import { GroupModel } from "@/domain/models/Group";

export interface DeleteGroupRepository {
    deleteById(id: string): Promise<GroupModel>;
}