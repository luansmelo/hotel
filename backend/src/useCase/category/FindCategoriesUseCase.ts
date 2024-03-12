import { FindCategories, FindCategoriesContract } from "@/contracts";
import {
  FindCategoriesParams,
  FindCategoriesResponse,
} from "@/entities/category/FindCategoriesParams";

export class FindCategoriesUseCase implements FindCategories {
  constructor(private readonly findCategories: FindCategoriesContract) {}

  async findAll(
    params: FindCategoriesParams
  ): Promise<FindCategoriesResponse | null> {
    return this.findCategories.findAll(params);
  }
}
