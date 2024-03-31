import { InputModel } from "@/domain/models/Input";

export interface DeleteInputRepository {
    deleteById(id: string): Promise<InputModel>;
}