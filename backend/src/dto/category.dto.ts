import { Weekdays } from "../utils/enums/weekdays";
import { ProductInput } from "./product.dto";

export interface CategoryInput {
  name: string;
}

export interface CategoryContract {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SendProductToAddToCategory {
  productId: string;
  weekDay: string[];
}

export interface ProductCategoryInput {
  menuId: string;
  categoryId: string;
  product: SendProductToAddToCategory[];
}

export interface ProductCategoryContract {
  id: string;
  menuId: string;
  categoryId: string;
  productId: string;
  weekDay: string;
  created_at: string;
  updated_at: string;
}

export interface ProductToCategoryInput {
  id: string;
  categoryId: string;
  productId: string;
  weekDay: string;
}

export interface ProductToCategoryContract {
  id: string;
  categoryId: string;
  productId: string;
  weekDay: string;
  created_at: string;
  updated_at: string;
}
