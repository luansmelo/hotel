import { InputController } from "../../controllers/insumo.controller";
import { InsumoRepository } from "../../repositories/insumos.repository";
import { db } from "../../database";
import { InputService } from "../../services/insumo.service";

export function makeInputController(): InputController {
  const inputRepository = new InsumoRepository(db);
  const inputService = new InputService(inputRepository);
  const inputController = new InputController(inputService);
  return inputController;
}
