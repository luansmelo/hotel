import { GroupModel } from "@/domain/models/Group";

export interface DeleteGroupUseCaseContract {
    deleteById(id: string): Promise<GroupModel>;
}
