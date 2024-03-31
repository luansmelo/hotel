import { CreateInputModel } from "@/entities/input/createInput";
import { GroupModel } from "@/domain/models/Group";
import { MeasureModel } from "@/domain/models/Measure";

export interface InputModel {
  id?: string;
  name: string;
  code: string;
  grammage?: number;
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
