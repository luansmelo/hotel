export interface CreateProductModel {
  name: string;
  description: string;
  preparationTime: number;
  resource: string;
  photo_url?: string;
}
