import { GroupModel } from "@/domain/models/Group";

export interface CreateGroupModel {
    name: string;
}

export interface CreateGroup {
    create(input: CreateGroupModel): Promise<GroupModel>;
}
