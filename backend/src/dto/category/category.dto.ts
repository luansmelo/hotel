export class Category {
  id?: string;
  name: string;
}

export interface ProductToCategoryContract {
  id?: string;
  categoryId: string;
  productId: string;
  weekDay: string;
}
