import { InputRegister } from "../../dto/input.dto";

export interface InputRepositoryContract {
  save(input: InputRegister): Promise<any>;
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  updateById(id: string, input: InputRegister): Promise<void>;
  deleteById(id: string): Promise<void>;
}

export interface InputServiceContract {
  create(input: InputRegister): Promise<void>;
  getAll(): Promise<any>;
  updateById(id: string, input: InputRegister): Promise<void>;
  deleteById(id: string): Promise<void>;
}
