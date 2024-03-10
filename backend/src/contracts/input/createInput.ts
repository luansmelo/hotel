import { CreateInputModel } from "@/entities/input/createInput";
import { GroupModel } from "../group";
import { MeasureModel } from "../measure";

export interface InputModel {
  id?: string;
  name: string;
  code: string;
  unitPrice: number;
  measurementUnit: MeasureModel;
  groups: GroupModel[];
}

export interface CreateInputContract {
  save(input: CreateInputModel): Promise<InputModel>;
}

export interface CreateInput {
  create(input: CreateInputModel): Promise<InputModel>;
}
