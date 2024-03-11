export interface AddInputToProductModel {
  id: string;
  input: {
    id: string;
    measurementUnit: string;
    grammage: number;
  }[];
}
