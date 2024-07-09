import { InputModel } from "@/domain/models/Input";

export interface LoadInputByIdRepository {
    loadById(id: string): Promise<InputModel | null>
}