export interface DishDTO {
  name: string;
  description: string;
  variant: string;
  method_preparation?: string;
}

export interface AddInputToDish {
  dishId: string;
  inputId: string;
  unit_measurement: number;
}
