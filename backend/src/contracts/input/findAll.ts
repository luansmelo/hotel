import { InputModel } from "./createInput";

export interface FindInputsContract {
  findAll(): Promise<InputModel[] | null>;
}

export interface FindInputs {
  findAll(): Promise<InputModel[] | null>;
}
