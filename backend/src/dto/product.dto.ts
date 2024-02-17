import { Input, InputContract } from "./input.dto";

export interface ProductContract {
  id: string;
  name: string;
  description: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  name: string;
  description: string;
}

export interface ProductInputRemove {
  productId: string;
  inputId: string;
}

export interface AddInputToProductData {
  id: string;
  productId: string;
  input: Input[];
  created_at: string;
  updated_at: string;
}

export interface AddInputToProduct {
  productId: string;
  input: Input[];
}

export interface UpdatedProductInfo {
  name: string;
  description: string;
  inputs: UpdatedInputInfo[];
}

export interface UpdatedInputInfo {
  id: string;
  grammage: number;
  measurementUnit: string;
}
