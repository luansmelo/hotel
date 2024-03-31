import { GroupModel } from "@/domain/models/Group";

export interface LoadGroupByIdUseCaseContract {
  loadById(id: string): Promise<GroupModel | null>;
}