import { InputModel } from "./CreateInputContract";

export interface FindInputsContract {
  findAll(): Promise<InputModel[] | null>;
}

export interface FindInputs {
  findAll(): Promise<InputModel[] | null>;
}
