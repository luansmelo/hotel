import { InputContract, InputRegister } from "@/dto/input/input.dto";

export interface InputRepositoryContract {
  save(input: InputContract): Promise<any>;
  getAll(): Promise<any>;
  getByCode(code: string): Promise<any>;

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
