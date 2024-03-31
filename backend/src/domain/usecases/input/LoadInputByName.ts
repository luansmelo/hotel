import { InputModel } from "@/domain/models/Input";

export interface LoadInputByNameUseCaseContract {
  loadByName(name: string): Promise<InputModel | null>;
}