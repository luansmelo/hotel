import { InputModel } from "@/domain/models/Input";
import { CreateInputModel } from "@/domain/usecases/input/CreateInput";

export interface UpdateIngredientRepository {
    updateById(id: string, input: Partial<CreateInputModel>): Promise<Partial<InputModel | null>>;
}