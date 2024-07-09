import { InputModel } from "@/domain/models/Input";
import { CreateInputModel } from "@/domain/usecases/input/CreateInput";

export interface CreateIngredientRepository {
    create(input: CreateInputModel): Promise<InputModel>;
}