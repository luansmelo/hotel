import { Input, InputContract } from "./input.dto";

export interface ProductContract {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  name: string;
  description: string;
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
