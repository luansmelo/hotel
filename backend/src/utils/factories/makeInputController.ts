import { InputController } from "../../controllers/input.controller";
import { InputRepository } from "../../repositories/inputs.repository";
import { db } from "../../database";
import { InputService } from "../../services/input.service";

export function makeInputController(): InputController {
  const inputRepository = new InputRepository(db);
  const inputService = new InputService(inputRepository);
  const inputController = new InputController(inputService);
  return inputController;
}
