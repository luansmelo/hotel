import { GroupModel } from "@/domain/models/Group";
import { CreateGroupModel } from "@/domain/usecases/group/CreateGroup";

export interface UpdateGroupRepository {
    updateById(id: string, input: Partial<CreateGroupModel>): Promise<Partial<GroupModel | null>>;
}