import { InputModel } from "@/domain/models/Input";

export interface DeleteIngredientRepository {
    deleteById(id: string): Promise<InputModel>;
}