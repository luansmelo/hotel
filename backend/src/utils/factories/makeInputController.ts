import { InputController } from "../../controllers/input.controller";
import prisma from "../../database";
import { InputRepository } from "../../repositories/input.repository";
import { InputService } from "../../services/input.service";

export function makeInputController(): InputController {
  const repository = new InputRepository(prisma);
  const service = new InputService(repository);
  const controller = new InputController(service);
  return controller;
}
