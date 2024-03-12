import { FindCategories } from "@/contracts/category";
import {
  FindCategoriesParams,
  FindCategoriesResponse,
} from "@/entities/category/FindCategoriesParams";

export class FindCategoriesController {
  constructor(private readonly categories: FindCategories) {}

  async findAll(
    params: FindCategoriesParams
  ): Promise<FindCategoriesResponse | null> {
    return this.categories.findAll(params);
  }
}
