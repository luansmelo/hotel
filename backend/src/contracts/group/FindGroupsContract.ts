import { GroupModel } from "./CreateGroupContract";

export interface FindGroupsContract {
  findAll(): Promise<GroupModel[] | null>;
}

export interface FindGroups {
  findAll(): Promise<GroupModel[] | null>;
}
