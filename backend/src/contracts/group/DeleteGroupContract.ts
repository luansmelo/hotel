import { GroupModel } from "@/domain/models/Group";

export interface DeleteGroupContract {
  deleteById(id: string): Promise<GroupModel | null>;
}

export interface DeleteGroup {
  deleteById(id: string): Promise<GroupModel | null>;
}
