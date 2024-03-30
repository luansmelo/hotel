import { FindInputs, FindInputsContract } from "@/contracts/input";

import {
  FindInputsParams,
  FindInputsResponse,
} from "@/entities/input/FindInputsParams";

export class FindInputsUseCase implements FindInputs {
  constructor(private readonly findInputs: FindInputsContract) {}

  async findAll(params: FindInputsParams): Promise<FindInputsResponse | null> {
    return await this.findInputs.findAll(params);
  }
}
