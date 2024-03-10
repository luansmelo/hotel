import { CreateInputModel } from "@/entities/input/createInput";
import { InputModel } from "./createInput";

export interface UpdateInputContract {
  updateById(id: string, input: Partial<CreateInputModel>): Promise<InputModel>;
}

export interface UpdateInput {
  updateById(id: string, input: Partial<CreateInputModel>): Promise<InputModel>;
}
