import { InputDTO } from "../dto/input.dto";

export interface InputRepositoryContract {
  save(input: InputDTO): Promise<void>;
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  updateById(id: string, input: InputDTO): Promise<void>;
  deleteById(id: string): Promise<void>;
}

export interface InputServiceContract {
  create(input: InputDTO): Promise<void>;
  getAll(): Promise<any>;
  updateById(id: string, input: InputDTO): Promise<void>;
  deleteById(id: string): Promise<void>;
}
