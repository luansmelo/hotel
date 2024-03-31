import { GroupModel } from "@/domain/models/Group";
import { CreateGroupModel } from "@/domain/usecases/group/CreateGroup";

export interface CreateGroupRepository {
    create(input: CreateGroupModel): Promise<GroupModel>;
}