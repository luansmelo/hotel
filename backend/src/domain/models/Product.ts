import { InputModel } from "./Input";

export interface ProductModel {
  id?: string;
  name: string;
  description: string;
  preparationTime: string;
  accession?: number;
  grammage?: number;
  resource: string;
  photo_url?: string;
  inputs?: InputModel[];
}