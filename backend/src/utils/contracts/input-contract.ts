import { InputModal } from "@/dto/input/input.dto";

export interface InputRepositoryContract {
  save(input: InputModal): Promise<any>;
  getAll(): Promise<any>;
  getByCode(code: string): Promise<any>;

  getById(id: string): Promise<any>;
  updateById(id: string, input: Partial<InputModal>): Promise<void>;
  deleteById(id: string): Promise<void>;
}

export interface InputServiceContract {
  create(input: InputModal): Promise<void>;
  getAll(): Promise<any>;
  updateById(id: string, input: Partial<InputModal>): Promise<void>;
  deleteById(id: string): Promise<void>;
}
