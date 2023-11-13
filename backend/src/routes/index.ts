import { Router } from "express";
import * as inputs from "./input.routes";
import * as products from "./product.routes";
import * as menus from "./menu.routes";
import * as category from "./category.routes";
import * as user from "./user.routes";

const mainRouter = Router();

mainRouter.use(inputs.slug, inputs.router);
mainRouter.use(products.slug, products.router);
mainRouter.use(menus.slug, menus.router);
mainRouter.use(category.slug, category.router);
mainRouter.use(user.slug, user.router);

export default mainRouter;
