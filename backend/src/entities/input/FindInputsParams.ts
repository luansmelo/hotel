import { InputModel } from "@/contracts/input";

export type Sort = "name" | "code" | "unitPrice" | "measurementUnit" | "groups" | "createdAt" | "updatedAt";

export interface FindInputsParams {
  page?: number;
  sort: Sort;
  order: "asc" | "desc";
}

export interface FindInputsResponse {
  inputs: Partial<InputModel>[];
  totalPages: number;
  totalItems: number;
}
