import { GroupModel } from "@/domain/models/Group";

export interface LoadGroupsByIdsUseCaseContract {
    findByIds(id: string[]): Promise<GroupModel[] | null>;
}