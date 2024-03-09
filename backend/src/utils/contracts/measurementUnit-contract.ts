import { MeasureModel } from "@/dto/measurementUnit/measurementUnit.dto";

export interface MeasurementUnitRepositoryContract {
  save(input: MeasureModel): Promise<void>;
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  deleteById(id: string): Promise<MeasureModel>;
  updateById(id: string, input: Partial<MeasureModel>): Promise<MeasureModel>;
}

export interface MeasurementUnitServiceContract {
  create(input: MeasureModel): Promise<void>;
  getById(id: string): Promise<any>;
  getAll(): Promise<any>;
  deleteById(id: string): Promise<MeasureModel>;
  updateById(id: string, input: Partial<MeasureModel>): Promise<MeasureModel>;
}
