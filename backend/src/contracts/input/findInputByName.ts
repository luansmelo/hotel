import { InputModel } from "./createInput";

export interface FindInputByNameContract {
  findByName(name: string): Promise<InputModel | null>;
}

export interface FindInputByName {
  findByName(name: string): Promise<InputModel | null>;
}
