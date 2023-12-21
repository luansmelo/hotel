export interface InputContract {
  id: string;
  name: string;
  code: string;
  unitPrice: number;
  measurementUnit: string;
  group: string;
  created_at: string;
  updated_at: string;
}

export interface Input {
  id: string;
  name: string;
  measurementUnit: string;
  grammage: number;
}

export interface InputRegister {
  name: string;
  code: string;
  unitPrice: number;
  measurementUnit: string;
  group: string;
}
