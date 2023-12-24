import { MeasurementUnitController } from "../../controllers/measurementUnit.controller";
import prisma from "../../database";
import { MeasurementUnitRepository } from "../../repositories/measurementUnit.repository";
import { MeasurementUnitService } from "../../services/measurementUnit.service";

export function makeMeasurementUnitController(): MeasurementUnitController {
  const repository = new MeasurementUnitRepository(prisma);
  const service = new MeasurementUnitService(repository);
  const controller = new MeasurementUnitController(service);
  return controller;
}
