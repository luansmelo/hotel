import { GroupModel } from "@/domain/models/Group";
export interface FindGroupByIdContract {
  findById(id: string): Promise<GroupModel | null>;
}

export interface FindGroupById {
  findById(id: string): Promise<GroupModel | null>;
}
