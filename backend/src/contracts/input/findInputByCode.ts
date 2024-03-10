import { InputModel } from "./createInput";

export interface FindInputByCodeContract {
  findByCode(code: string): Promise<InputModel | null>;
}

export interface FindInputByCode {
  findByCode(code: string): Promise<InputModel | null>;
}
