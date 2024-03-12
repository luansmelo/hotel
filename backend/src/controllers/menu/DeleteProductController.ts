import { DeleteProduct } from "@/contracts/product";

export class DeleteProductController {
  constructor(private readonly product: DeleteProduct) {}

  async deleteById(id: string) {
    return this.product.deleteById(id);
  }
}
