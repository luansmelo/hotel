export interface InputContract {
  id: string;
  name: string;
  code: string;
  unitPrice: number;
  measurementUnitId: string;
  group: string[];
  created_at: string;
  updated_at: string;
}

export interface Input {
  id: string;
  measurementUnit: string;
  grammage: number;
}

export interface InputRegister {
  name: string;
  code: string;
  unitPrice: number;
  group: any[];
  measurementUnitId: string;
}
