import { PratoController } from "../../controllers/prato.controller";
import { PratoRepository } from "../../repositories/pratos.repository";
import { db } from "../../database";
import { PratoService } from "../../services/prato.service";

export function makePratoController(): PratoController {
  const insumoRepository = new PratoRepository(db);
  const insumoService = new PratoService(insumoRepository);
  const insumoController = new PratoController(insumoService);
  return insumoController;
}
