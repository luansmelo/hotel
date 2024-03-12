import { InputModel } from "./CreateInputContract";

export interface FindInputByCodeContract {
  findByCode(code: string): Promise<InputModel | null>;
}

export interface FindInputByCode {
  findByCode(code: string): Promise<InputModel | null>;
}
