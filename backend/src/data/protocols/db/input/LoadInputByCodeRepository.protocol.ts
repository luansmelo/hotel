import { InputModel } from "@/domain/models/Input";

export interface LoadInputByCodeRepository {
    loadByCode(code: string): Promise<InputModel | null>
}