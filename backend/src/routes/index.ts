import { Router } from "express";
import * as inputs from "./input.routes";
import * as products from "./product.routes";
import * as menus from "./menu.routes";

const mainRouter = Router();

mainRouter.use(inputs.slug, inputs.router);
mainRouter.use(products.slug, products.router);
mainRouter.use(menus.slug, menus.router);

export default mainRouter;
