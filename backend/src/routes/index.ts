import { Router } from "express";
import * as insumos from "./insumo.routes";
import * as pratos from "./prato.routes";
import * as categorias from "./categoria.routes";

const mainRouter = Router();

mainRouter.use(insumos.slug, insumos.router);
mainRouter.use(pratos.slug, pratos.router);
mainRouter.use(categorias.slug, categorias.router);

export default mainRouter;
