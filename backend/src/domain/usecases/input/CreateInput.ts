import { InputModel } from "@/domain/models/Input";

export interface CreateInputModel {
    name: string;
    code: string;
    unitPrice: number;
    measurementId: string;
    groupIds: string[];
}

export interface CreateInputUseCaseContract {
    create(param: CreateInputModel): Promise<InputModel>
}