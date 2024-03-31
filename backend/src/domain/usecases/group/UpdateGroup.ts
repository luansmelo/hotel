import { GroupModel } from "@/domain/models/Group";
import { CreateGroupModel } from "@/domain/usecases/group/CreateGroup";

export interface UpdateGroupUseCaseContract {
    updateById(id: string, input: Partial<CreateGroupModel>): Promise<Partial<GroupModel | null>>;
}