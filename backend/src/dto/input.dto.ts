export interface InputContract {
  id: string;
  name: string;
  code: string;
  unitPrice: number;
  measurementUnit: string;
  group: string;
  grammage: number;
  created_at: string;
  updated_at: string;
}

export interface InputRegister {
  name: string;
  code: string;
  unitPrice: number;
  measurementUnit: string;
  group: string;
  grammage: number;
}
