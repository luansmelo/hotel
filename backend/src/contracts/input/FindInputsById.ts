import { InputModel } from "./createInput";

export interface FindInputsByIdContract {
  findByIds(id: string[]): Promise<InputModel[] | null>;
}

export interface FindInputsById {
  findByIds(id: string[]): Promise<InputModel[] | null>;
}
