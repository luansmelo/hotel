import { InputModel } from "@/domain/models/Input";

export type Sort = "name" | "code" | "unitPrice" | "measurement" | "groups" | "createdAt" | "updatedAt";

export interface FindInputsParams {
  page?: number;
  sort?: Sort;
  order?: 'asc' | 'desc';
}

export interface FindInputsResponse {
  ingredients: Partial<InputModel>[];
  totalPages: number;
  totalItems: number;
}
