import { GroupModel } from "./CreateGroupContract";

export interface FindGroupByNameContract {
  findByName(id: string): Promise<GroupModel | null>;
}

export interface FindGroupByName {
  findByName(id: string): Promise<GroupModel | null>;
}
