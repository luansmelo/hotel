import { Router } from "express";
import * as insumos from "./insumo.routes";

const mainRouter = Router();

mainRouter.use(insumos.slug, insumos.router);

export default mainRouter;