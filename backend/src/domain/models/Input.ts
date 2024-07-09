import { GroupModel } from "./Group";
import { MeasureModel } from "./Measure";

export interface InputModel {
  id?: string;
  name: string;
  code: string;
  grammage?: number;
  unitPrice: number;
  measurement: MeasureModel;
  groups: GroupModel[];
}