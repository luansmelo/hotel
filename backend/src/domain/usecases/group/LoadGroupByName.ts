import { GroupModel } from "@/domain/models/Group";

export interface LoadGroupByNameUseCaseContract {
  loadByName(name: string): Promise<GroupModel | null>;
}