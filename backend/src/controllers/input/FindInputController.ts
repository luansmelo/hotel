import { FindInputs } from "@/contracts/input";
import {
  FindInputsParams,
  FindInputsResponse,
} from "@/entities/input/FindInputsParams";

export class FindInputsController {
  constructor(private readonly inputs: FindInputs) {}

  async findAll(params: FindInputsParams): Promise<FindInputsResponse | null> {
    return this.inputs.findAll(params);
  }
}
