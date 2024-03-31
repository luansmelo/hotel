import { InputModel } from "@/domain/models/Input";

export interface LoadInputByCodeUseCaseContract {
  loadByCode(name: string): Promise<InputModel | null>;
}