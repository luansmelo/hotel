import { InputModel } from "./createInput";

export interface FindInputByNameContract {
  findByName(name: string): Promise<InputModel | null>;
}
