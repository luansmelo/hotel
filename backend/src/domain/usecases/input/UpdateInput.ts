import { InputModel } from "@/domain/models/Input";
import { CreateInputModel } from "./CreateInput";

export interface UpdateInputUseCaseContract {
    updateById(id: string, input: Partial<CreateInputModel>): Promise<Partial<InputModel | null>>;
}