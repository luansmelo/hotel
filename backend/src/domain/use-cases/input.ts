import { Input } from "../entities/input";

export interface InputUseCases {
  create(input: CreateInput): Promise<Input>;
  getByID(input: string): Promise<Input>;
}

export interface CreateInput {
  name: string;
  code: string;
  unitPrice: number;
  measurementUnit: string;
  grammage: number;
  group: string;
}
