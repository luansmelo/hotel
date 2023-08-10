import { InsumoController } from "../../controllers/insumo.controller";
import { InsumoRepository } from "../../repositories/insumos.repository";
import { db } from "../../database";
import { InsumoService } from "../../services/insumo.service";

export function makeInsumoController(): InsumoController {
  const insumoRepository = new InsumoRepository(db);
  const insumoService = new InsumoService(insumoRepository);
  const insumoController = new InsumoController(insumoService);
  return insumoController;
}
