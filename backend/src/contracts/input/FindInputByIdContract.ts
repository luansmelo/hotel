import { InputModel } from "./CreateInputContract";

export interface FindInputByIdContract {
  findById(id: string): Promise<InputModel | null>;
}

export interface FindInputById {
  findById(id: string): Promise<InputModel | null>;
}