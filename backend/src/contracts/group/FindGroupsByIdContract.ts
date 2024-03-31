import { GroupModel } from "@/domain/models/Group";
export interface FindGroupsByIdContract {
  findByIds(id: string[]): Promise<GroupModel[] | null>;
}

export interface FindGroupsById {
  findByIds(id: string[]): Promise<GroupModel[] | null>;
}
