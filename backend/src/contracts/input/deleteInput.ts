import { InputModel } from "./createInput";

export interface DeleteInputContract {
  deleteById(id: string): Promise<InputModel>;
}

export interface DeleteInput {
  deleteById(id: string): Promise<InputModel>;
}
