import { CreateInputModel } from "@/entities/input/createInput";
import { InputModel } from "./CreateInputContract";

export interface UpdateInputContract {
  updateById(
    id: string,
    input: Partial<CreateInputModel>
  ): Promise<Partial<InputModel>>;
}

export interface UpdateInput {
  updateById(
    id: string,
    input: Partial<CreateInputModel>
  ): Promise<Partial<InputModel>>;
}
