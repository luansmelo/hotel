import { CreateInput, InputUseCases } from "../../domain/use-cases/input";
import { randomUUID } from "crypto";
import {
  CreateInputRepo,
  InputRepository,
} from "../contracts/repositories/input";
import { InputContract } from "../contracts/domain/input";

export class InputService implements InputUseCases {
  constructor(private readonly repo: InputRepository) {}
  async create(input: CreateInput): Promise<InputContract> {
    const data: CreateInputRepo = {
      id: randomUUID(),
      name: input.name,
      unitPrice: input.unitPrice,
      measurementUnit: input.measurementUnit,
      grammage: input.grammage,
      group: input.group,
      code: input.code,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return this.repo.create(data);
  }
  async getByID(input: string): Promise<InputContract> {
    return  this.repo.getByID(input);
  }
}
