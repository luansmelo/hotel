import { InputData } from "./input.dto";

export interface ProductData {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ProductRegister {
  name: string;
  description: string;
}

export interface AddInputToProductData {
  id: string;
  productId: string;
  input: InputData[];
}

export interface AddInputToProduct {
  productId: string;
  input: InputData[];
}
