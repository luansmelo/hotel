import { InputContract } from "../domain/input";

export abstract class InputRepository {
  abstract create(input: CreateInputRepo): Promise<InputContract>;
  abstract getByID(input: string): Promise<InputContract>;
}

export type CreateInputRepo = {
  id: string;
  name: string;
  code: string;
  unitPrice: number;
  measurementUnit: string;
  grammage: number;
  group: string;
  created_at: string;
  updated_at: string;
};
