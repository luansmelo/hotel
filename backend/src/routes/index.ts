import { Router } from "express";
import * as insumos from "./insumo.routes";
import * as pratos from "./prato.routes";

const mainRouter = Router();

mainRouter.use(insumos.slug, insumos.router);
mainRouter.use(pratos.slug, pratos.router);

export default mainRouter;
