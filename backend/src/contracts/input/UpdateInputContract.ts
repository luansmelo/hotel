import { CreateInputModel } from "@/entities/input/createInput";

export interface UpdateInputContract {
  updateById(id: string, input: Partial<CreateInputModel>): Promise<void>;
}

export interface UpdateInput {
  updateById(id: string, input: Partial<CreateInputModel>): Promise<void>;
}
