import { GroupModel } from "./createGroup";

export interface FindGroupsContract {
  findAll(): Promise<GroupModel[] | null>;
}

export interface FindGroups {
  findAll(): Promise<GroupModel[] | null>;
}
