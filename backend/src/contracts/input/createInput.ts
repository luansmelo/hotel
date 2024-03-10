import { CreateInputModel } from "@/entities/input/createInput";

export interface InputModel {
  id?: string;
  name: string;
  code: string;
  unitPrice: number;
  measurementUnitId: string;
  groups: string[];
}

export interface CreateInputContract {
  save(input: CreateInputModel): Promise<InputModel>;
}

export interface CreateInput {
  create(input: CreateInputModel): Promise<InputModel>;
}
