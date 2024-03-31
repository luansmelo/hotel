import { GroupModel } from "@/domain/models/Group";

export interface CreateGroupModel {
    name: string;
}

export interface CreateGroupUseCaseContract {
    create(input: CreateGroupModel): Promise<GroupModel>;
}
