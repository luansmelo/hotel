import { InputModel } from "./CreateInputContract";

export interface FindInputByNameContract {
  findByName(name: string): Promise<InputModel | null>;
}

export interface FindInputByName {
  findByName(name: string): Promise<InputModel | null>;
}
