import { InputModel } from "./CreateInputContract";

export interface DeleteInputContract {
  deleteById(id: string): Promise<InputModel>;
}

export interface DeleteInput {
  deleteById(id: string): Promise<InputModel>;
}
