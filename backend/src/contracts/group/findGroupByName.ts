import { GroupModel } from "./createGroup";

export interface FindGroupByNameContract {
  findByName(id: string): Promise<GroupModel | null>;
}

export interface FindGroupByName {
  findByName(id: string): Promise<GroupModel | null>;
}
