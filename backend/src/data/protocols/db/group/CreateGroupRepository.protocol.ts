import { GroupModel } from "@/domain/models/Group";
import { CreateGroupModel } from "@/entities/group/createGroup";

export interface CreateGroupRepository {
    create(input: CreateGroupModel): Promise<GroupModel>;
}