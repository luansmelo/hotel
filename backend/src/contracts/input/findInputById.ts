import { InputModel } from "./createInput";

export interface FindInputByIdContract {
  findById(id: string): Promise<InputModel | null>;
}

export interface FindInputById {
  findById(id: string): Promise<InputModel | null>;
}
