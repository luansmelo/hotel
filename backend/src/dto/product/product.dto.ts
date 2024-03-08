import { Input } from "../input/input.dto";

export interface ProductModel {
  id?: string;
  name: string;
  description: string;
  preparationTime: number;
  resource: string;
  photo_url?: string;
  inputs?: Input[];
}

export interface ProductInput {
  name: string;
  description: string;
}

export interface Product {
  productId: string;
  weekDay: string[];
}

export interface ProductInputRemove {
  productId: string;
  inputId: string;
}

export interface AddInputToProductData {
  id: string;
  productId: string;
  input: Input[];
}

export interface AddInputToProduct {
  productId: string;
  input: Input[];
}

export interface UpdatedInput {
  grammage: number;
  measurementUnit: string;
}
