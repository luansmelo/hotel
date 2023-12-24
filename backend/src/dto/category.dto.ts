import { Weekdays } from "../utils/enums/weekdays";

export interface CategoryInput {
  name: string;
}

export interface CategoryContract {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ProductToCategoryInput {
  id: string;
  categoryId: string;
  productId: string;
  weekDay: Weekdays;
}

export interface ProductToCategoryContract {
  id: string;
  categoryId: string;
  productId: string;
  weekDay: string;
  created_at: string;
  updated_at: string;
}
