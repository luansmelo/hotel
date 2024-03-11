import { GroupModel } from "./createGroup";

export interface FindGroupsByIdContract {
  findByIds(id: string[]): Promise<GroupModel[] | null>;
}

export interface FindGroupsById {
  findByIds(id: string[]): Promise<GroupModel[] | null>;
}
