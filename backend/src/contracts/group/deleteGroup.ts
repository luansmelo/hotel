import { GroupModel } from "./createGroup";

export interface DeleteGroupContract {
  deleteById(id: string): Promise<GroupModel>;
}

export interface DeleteGroup {
  deleteById(id: string): Promise<GroupModel>;
}
