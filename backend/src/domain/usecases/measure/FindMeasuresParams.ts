import { MeasureModel } from "@/domain/models/Measure";

export type Sort = "name" | "createdAt" | "updatedAt";

export interface FindMeasuresParams {
  page?: number;
  sort?: Sort;
  order?: 'asc' | 'desc';
}

export interface FindMeasuresResponse {
  measures: Partial<MeasureModel>[];
  totalPages: number;
  totalItems: number;
}
