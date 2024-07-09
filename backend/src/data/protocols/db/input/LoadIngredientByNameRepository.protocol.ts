import { InputModel } from "@/domain/models/Input";

export interface LoadInputByNameRepository {
    loadByName(string: string): Promise<InputModel | null>
}