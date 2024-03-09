import { DeleteCategory } from "@/contracts/category";

export class DeleteCategoryController {
  constructor(private readonly deleteCategory: DeleteCategory) {}

  async deleteById(id: string) {
    return this.deleteCategory.deleteById(id);
  }
}
