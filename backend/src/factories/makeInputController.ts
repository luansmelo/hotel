import { InputController } from "@/controllers/input.controller";
import prisma from "@/config/prisma";
import { InputRepository } from "@/repositories/input.repository";
import { InputService } from "@/services/input.service";
import { MeasurementUnitRepository } from "@/repositories/measure.repository";

export function makeInputController(): InputController {
  const repository = new InputRepository(prisma);
  const measurementRepository = new MeasurementUnitRepository(prisma);
  const service = new InputService(repository, measurementRepository);
  const controller = new InputController(service);
  return controller;
}
