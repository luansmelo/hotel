import { InputModel } from "./createInput";

export interface FindInputContract {
  findAll(): Promise<InputModel[] | null>;
}

export interface FindInput {
  findAll(): Promise<InputModel[] | null>;
}
