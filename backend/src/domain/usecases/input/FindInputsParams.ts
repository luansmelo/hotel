import { InputModel } from "@/domain/models/Input";

export type Sort = "name" | "code" | "unitPrice" | "measurementUnit" | "groups" | "createdAt" | "updatedAt";

export interface FindInputsParams {
  page?: number;
  sort?: Sort;
  order?: 'ASC' | 'DESC';
}

export interface FindInputsResponse {
  inputs: Partial<InputModel>[];
  totalPages: number;
  totalItems: number;
}