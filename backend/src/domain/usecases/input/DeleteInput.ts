import { InputModel } from "@/domain/models/Input";

export interface DeleteInputUseCaseContract {
    deleteById(id: string): Promise<InputModel>;
}
