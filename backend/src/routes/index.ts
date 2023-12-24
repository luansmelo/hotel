import { Router } from "express";
import * as inputs from "./input.routes";
import * as products from "./product.routes";
import * as menus from "./menu.routes";
import * as category from "./category.routes";
import * as user from "./user.routes";
import * as group from "./group.routes";
import * as measurementUnit from "./measurementUnit.routes";

const mainRouter = Router();

mainRouter.use(inputs.slug, inputs.router);
mainRouter.use(products.slug, products.router);
mainRouter.use(menus.slug, menus.router);
mainRouter.use(category.slug, category.router);
mainRouter.use(user.slug, user.router);
mainRouter.use(group.slug, group.router);
mainRouter.use(measurementUnit.slug, measurementUnit.router);

export default mainRouter;
