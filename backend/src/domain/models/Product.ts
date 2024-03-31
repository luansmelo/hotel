import { InputModel } from "./Input";

export interface ProductModel {
  id?: string;
  name: string;
  description: string;
  preparationTime: number;
  grammage?: number;
  resource: string;
  photo_url?: string;
  inputs?: InputModel[];
}