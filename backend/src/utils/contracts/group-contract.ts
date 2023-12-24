import { GroupInput } from "../../dto/group.dto";

export interface GroupRepositoryContract {
  save(input: GroupInput): Promise<void>;
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  deleteById(id: string): Promise<void>;
}

export interface GroupServiceContract {
  create(input: GroupInput): Promise<void>;
  getById(id: string): Promise<any>;
  getAll(): Promise<any>;
  deleteById(id: string): Promise<void>;
}
