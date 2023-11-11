import { Router } from "express";
import * as inputs from "./input.routes";
import * as products from "./product.routes";
import * as menus from "./menu.routes";
import * as category from "./category.routes";
import * as account from "./account.routes";
import * as auth from "./auth.routes";

const mainRouter = Router();

mainRouter.use(account.slug, account.router);
mainRouter.use(inputs.slug, inputs.router);
mainRouter.use(products.slug, products.router);
mainRouter.use(menus.slug, menus.router);
mainRouter.use(category.slug, category.router);
mainRouter.use(auth.slug, auth.router);

export default mainRouter;
