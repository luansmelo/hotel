import { CreateGroupModel } from "@/entities/group/createGroup";

export interface GroupModel {
  id?: string;
  name: string;
}

export interface CreateGroupContract {
  save(input: CreateGroupModel): Promise<GroupModel>;
}

export interface CreateGroup {
  create(input: CreateGroupModel): Promise<GroupModel>;
}
