import { CreateGroupModel } from "@/entities/group/createGroup";
import { GroupModel } from "./createGroup";

export interface UpdateGroupContract {
  updateById(id: string, input: Partial<CreateGroupModel>): Promise<GroupModel>;
}

export interface UpdateGroup {
  updateById(id: string, input: Partial<CreateGroupModel>): Promise<GroupModel>;
}
