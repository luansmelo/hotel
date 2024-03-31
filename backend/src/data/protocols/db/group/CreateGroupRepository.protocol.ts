import { GroupModel } from "@/domain/models/Group";
import { CreateGroupModel } from "@/domain/usecases/group/group/createGroup";

export interface CreateGroupRepository {
    create(input: CreateGroupModel): Promise<GroupModel>;
}