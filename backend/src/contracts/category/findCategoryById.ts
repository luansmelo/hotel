import { Category } from "@/dto/category/category.dto";

export interface FindCategoryByIdContract {
  findById(id: string): Promise<Category | null>;
}
