import { Weekdays } from "../utils/enums/weekdays";

export interface CategoryDTO {
  name: string;
}

export interface AddProductToCategoryDTO {
  categoryId: string;
  productId: string;
  weekDay: string;
}
