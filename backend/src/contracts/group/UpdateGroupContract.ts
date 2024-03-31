import { CreateGroupModel } from "@/entities/group/createGroup";
import { GroupModel } from "@/domain/models/Group";
export interface UpdateGroupContract {
  updateById(id: string, input: Partial<CreateGroupModel>): Promise<Partial<GroupModel | null>>;
}

export interface UpdateGroup {
  updateById(id: string, input: Partial<CreateGroupModel>): Promise<Partial<GroupModel | null>>;
}
