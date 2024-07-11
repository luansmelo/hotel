import { InputModel } from "./Input";

export enum Status {
  COMPLETE = "COMPLETE",
  INCOMPLETE = "INCOMPLETE"
}

export interface ProductModel {
  id?: string;
  name: string;
  description: string;
  preparationTime: string;
  accession: number;
  grammage?: number;
  resource: string;
  status: string,
  photo_url?: string;
  ingredients?: InputModel[];
  createdAt?: Date
  updatedAt?: Date
}