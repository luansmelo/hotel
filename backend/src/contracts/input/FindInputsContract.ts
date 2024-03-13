import {
  FindInputsParams,
  FindInputsResponse,
} from "@/entities/input/FindInputsParams";


export interface FindInputsContract {
  findAll(params: FindInputsParams): Promise<FindInputsResponse | null>;
}

export interface FindInputs {
  findAll(params: FindInputsParams): Promise<FindInputsResponse | null>;
}
