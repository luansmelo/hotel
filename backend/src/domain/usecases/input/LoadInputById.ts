import { InputModel } from "@/domain/models/Input";

export interface LoadInputByIdUseCaseContract {
  loadById(id: string): Promise<InputModel | null>;
}