import { GroupModel } from "./CreateGroupContract";

export interface DeleteGroupContract {
  deleteById(id: string): Promise<GroupModel | null>;
}

export interface DeleteGroup {
  deleteById(id: string): Promise<GroupModel | null>;
}
