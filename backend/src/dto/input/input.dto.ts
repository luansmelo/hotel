export interface InputContract {
  id: string;
  name: string;
  code: string;
  unitPrice: number;
  measurementUnitId: string;
  groups: string[];
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
  groups: any[];
  measurementUnitId: string;
}
