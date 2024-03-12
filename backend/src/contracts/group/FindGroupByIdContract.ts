import { GroupModel } from "./CreateGroupContract";

export interface FindGroupByIdContract {
  findById(id: string): Promise<GroupModel | null>;
}

export interface FindGroupById {
  findById(id: string): Promise<GroupModel | null>;
}
