import {
  FindInputsParams,
  FindInputsResponse,
} from "@/entities/input/FindInputsParams";

export interface FindInputsContract {
  findAll(params: FindInputsParams): Promise<FindInputsResponse>;
}

export interface FindInputs {
  findAll(params: Partial<FindInputsParams>): Promise<FindInputsResponse>;
}
