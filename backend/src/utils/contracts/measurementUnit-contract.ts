import {
  MeasurementUnitContract,
  MeasurementUnitInput,
} from "../../dto/measurementUnit.dto";

export interface MeasurementUnitRepositoryContract {
  save(input: MeasurementUnitContract): Promise<void>;
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  deleteById(id: string): Promise<MeasurementUnitContract>;
  updateById(
    id: string,
    input: MeasurementUnitInput
  ): Promise<MeasurementUnitContract>;
}

export interface MeasurementUnitServiceContract {
  create(input: MeasurementUnitInput): Promise<void>;
  getById(id: string): Promise<any>;
  getAll(): Promise<any>;
  deleteById(id: string): Promise<MeasurementUnitContract>;
  updateById(
    id: string,
    input: MeasurementUnitInput
  ): Promise<MeasurementUnitContract>;
}
