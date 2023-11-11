import { InputController } from "../../controllers/input.controller";
import prisma from "../../database";
import { InputRepository } from "../../repositories/input.repository";
import { InputService } from "../../services/input.service";

export function makeInputController(): InputController {
  const inputRepository = new InputRepository(prisma);
  const inputService = new InputService(inputRepository);
  const inputController = new InputController(inputService);
  return inputController;
}
